import { Connection, PublicKey } from '@solana/web3.js';
import {
  getFilteredProgramAccounts,
  mergeTransactions,
  sendTransaction,
} from './web3';

import { Market } from '@project-serum/serum';
import { SERUM_PROGRAM_IDS_V2 } from './ids';
import { SwapConfig } from './types';
import { getPoolByMintAddress } from './pools';

export class Swap {
  private market: Market | undefined;

  constructor(market: Market) {
    this.market = market;
  }

  static async load(
    connection: Connection,
    coinMintAddress: string | PublicKey,
    pcMintAddress: string | PublicKey,
    env = 'mainnet',
  ) {
    const liquidity = getPoolByMintAddress(coinMintAddress, pcMintAddress, env);

    let serumMarketId;

    let serumMarketA;
    let serumMarketB;

    if (liquidity) {
      serumMarketId = liquidity.serumMarket;
    } else {
      serumMarketA = await Swap.getSerumMarketV2(
        connection,
        coinMintAddress,
        pcMintAddress,
        env,
      );
      if (serumMarketA.length === 1) {
        serumMarketId = serumMarketA[0].publicKey;
      } else {
        serumMarketB = await Swap.getSerumMarketV2(
          connection,
          pcMintAddress,
          coinMintAddress,
          env,
        );

        if (serumMarketA.length === 1) {
          serumMarketId = serumMarketB[0].publicKey;
        } else {
          throw new Error('Invalid trade route');
        }
      }
    }

    const market = await Market.load(
      connection,
      serumMarketId,
      {},
      SERUM_PROGRAM_IDS_V2[env],
    );

    return new Swap(market);
  }

  static async getSerumMarketV2(
    connection,
    baseMintAddress,
    quoteMintAddress,
    env,
  ) {
    const filters = [
      {
        memcmp: {
          offset: 5 + 8 + 32 + 8,
          bytes: baseMintAddress.toBase58(),
        },
      },
      {
        memcmp: {
          offset: 5 + 8 + 32 + 8 + 32,
          bytes: quoteMintAddress.toBase58(),
        },
      },
      {
        dataSize: 388,
      },
    ];

    const programId = SERUM_PROGRAM_IDS_V2[env];

    return await getFilteredProgramAccounts(connection, programId, filters);
  }

  async getAsks(connection: Connection) {
    return await this.market?.loadAsks(connection);
  }

  async getBids(connection: Connection) {
    // need reverse
    return await this.market?.loadBids(connection);
  }

  getSide(fromMintAddress: PublicKey, toMintAddress: PublicKey) {
    if (
      fromMintAddress.toBase58() === this.market?.baseMintAddress.toBase58() &&
      toMintAddress.toBase58() === this.market.quoteMintAddress.toBase58()
    ) {
      return 'sell';
    } else if (
      fromMintAddress.toBase58() === this.market?.quoteMintAddress.toBase58() &&
      toMintAddress.toBase58() === this.market.baseMintAddress.toBase58()
    ) {
      return 'buy';
    }

    throw new Error('Invalid trade route');
  }

  forecastBuy(orderBook, pcIn) {
    let coinOut = 0;
    let worstPrice = 0;
    let availablePc = pcIn;

    for (const { key, quantity } of orderBook.slab.items(false)) {
      const price = this.market?.priceLotsToNumber(key.ushrn(64)) || 0;
      const size = this.market?.baseSizeLotsToNumber(quantity) || 0;

      const orderPcVaule = price * size;
      worstPrice = price;

      if (orderPcVaule >= availablePc) {
        coinOut += availablePc / price;
        availablePc = 0;
        break;
      } else {
        coinOut += size;
        availablePc -= orderPcVaule;
      }
    }

    //const avgPrice = (pcIn - availablePc) / coinOut;
    const maxInAllow = pcIn - availablePc;

    return {
      maxInAllow,
      amountOut: coinOut,
      worstPrice,
    };
  }

  forecastSell(orderBook, coinIn) {
    let pcOut = 0;
    let worstPrice = 0;
    let availableCoin = coinIn;

    for (const { key, quantity } of orderBook.slab.items(true)) {
      const price = this.market?.priceLotsToNumber(key.ushrn(64)) || 0;
      const size = this.market?.baseSizeLotsToNumber(quantity) || 0;
      console.log(price, size);

      worstPrice = price;

      if (availableCoin <= size) {
        pcOut += availableCoin * price;
        availableCoin = 0;
        break;
      } else {
        pcOut += price * size;
        availableCoin -= size;
      }
    }

    // const avgPrice = pcOut / (coinIn - availableCoin);
    const maxInAllow = coinIn - availableCoin;

    return {
      maxInAllow,
      amountOut: pcOut,
      worstPrice,
    };
  }

  async forecast(
    connection: Connection,
    fromMintAddress: PublicKey,
    toMintAddress: PublicKey,
    amountIn: number,
    tradeConfig: SwapConfig = { slippage: 100, partialFill: true },
  ) {
    const side = this.getSide(fromMintAddress, toMintAddress);
    let orderBook;

    if (side === 'buy') {
      orderBook = await this.getAsks(connection);
      return { ...{ side }, ...this.forecastBuy(orderBook, amountIn) };
    } else if (side === 'sell') {
      orderBook = await this.getBids(connection);
      return { ...{ side }, ...this.forecastSell(orderBook, amountIn) };
    }
  }

  async swap(
    connection: Connection,
    wallet: any,
    fromMintAddress: PublicKey,
    toMintAddress: PublicKey,
    fromTokenAccount: PublicKey,
    toTokenAccount: PublicKey,
    forecastConfig,
    tradeConfig: SwapConfig = { slippage: 100, partialFill: true },
  ) {
    const order = await this.market?.makePlaceOrderTransaction(connection, {
      owner: wallet.publicKey,
      payer: fromTokenAccount,
      side: forecastConfig.side,
      price: forecastConfig.worstPrice,
      size: forecastConfig.maxInAllow,
      orderType: 'ioc',
    });
    const signers = order?.signers;

    const settleTransactions = [];
    // let baseTokenAccount;
    // let quoteTokenAccount;

    // if (forecastConfig.maxInAllow === 'buy') {
    //   baseTokenAccount = toTokenAccount;
    //   quoteTokenAccount = fromTokenAccount;
    // } else {
    //   baseTokenAccount = fromTokenAccount;
    //   quoteTokenAccount = toTokenAccount;
    // }

    // for (const openOrders of await this.market?.findOpenOrdersAccountsForOwner(
    //   connection,
    //   wallet.publicKey,
    // )) {
    //   const settle = await this.market?.makeSettleFundsTransaction(
    //     connection,
    //     openOrders,
    //     baseTokenAccount,
    //     quoteTokenAccount,
    //   );

    //   console.log(openOrders);

    //   settleTransactions.push(settle?.transaction);
    // }

    const transaction = mergeTransactions([
      this.market?.makeMatchOrdersTransaction(5),
      order?.transaction,
      this.market?.makeMatchOrdersTransaction(5),
      ...settleTransactions,
    ]);

    return await sendTransaction(connection, wallet, transaction, signers);
  }
}
