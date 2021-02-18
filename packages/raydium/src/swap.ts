import {
  Account,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  LIQUIDITY_POOL_PROGRAM_IDS,
  SERUM_PROGRAM_IDS_V2,
  TOKEN_PROGRAM_ID,
} from './ids';
import { PoolInfo, SwapConfig } from './types';
import { nu64, struct, u8 } from 'buffer-layout';

import { Market } from '@project-serum/serum';
import { getPoolByMintAddress } from './pools';
import { publicKeyLayout } from './layouts';
import { sendTransaction } from './transactions';

export class Swap {
  private connection: Connection;
  private wallet: any;

  // private programId: PublicKey;

  // public poolInfo: PoolInfo;

  private market: Market | undefined;

  constructor(
    connection: Connection,
    wallet: any,
    // coinMintAddress: string | PublicKey,
    // pcMintAddress: string | PublicKey,
    env = 'mainnet',
  ) {
    // const poolInfo = getPoolByMintAddress(coinMintAddress, pcMintAddress, env);

    // if (!poolInfo) {
    //   throw new Error('Insufficient liquidity for this trade');
    // }

    this.connection = connection;
    this.wallet = wallet;

    this.init();

    // this.programId = LIQUIDITY_POOL_PROGRAM_IDS[env];
    // this.poolInfo = poolInfo;
  }

  async init() {
    this.market = await Market.load(
      this.connection,
      new PublicKey('2CBkdG8fx6qyksxEUwzDqKCuvopQX28g7UqRxYRgkRsv'),
      {},
      SERUM_PROGRAM_IDS_V2.mainnet,
    );
  }

  async getAsks() {
    return await this.market?.loadAsks(this.connection);
  }

  async getBids() {
    // need reverse
    return await this.market?.loadBids(this.connection);
  }

  getDirection(fromMintAddress: PublicKey, toMintAddress: PublicKey) {}

  async forecast(
    fromMintAddress: PublicKey,
    fromTokenAccount: PublicKey,
    toMintAddress: PublicKey,
    tokenAccount: PublicKey,
    amountIn: number,
    config: SwapConfig = { slippage: 100, partialFill: true },
  ) {
    // const direction = this.getDirection(fromMintAddress, toMintAddress);

    const direction = 'sell';

    let orderBook;
    let units = 0;
    let amountOut = 0;

    if (direction === 'sell') {
      orderBook = await this.getBids();

      // console.log(orderBook.slab);
      for (const order of orderBook.slab.items()) {
        console.log(order);
      }

      for (const order of orderBook) {
        let { price, size } = order;
        console.log(price, size);
        price = price * 1e6;
        size = size * 1e6;

        if (units + size > amountIn) {
          amountOut += price * (amountIn - units);
          break;
        } else {
          units += size;
          amountOut += price * size;
        }
      }

      return { amountIn, amountOut };
    }
  }
}
