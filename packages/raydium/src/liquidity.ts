import {
  Account,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { LIQUIDITY_POOL_PROGRAM_IDS, TOKEN_PROGRAM_ID } from './ids';
import { getMintDecimals, sendTransaction } from './web3';
import { nu64, struct, u8 } from 'buffer-layout';
import { throwIfNull, throwIfUndefined } from './errors';

import { OpenOrders } from '@project-serum/serum';
import { PoolInfo } from './types';
import { getPoolByMintAddress } from './pools';
import { publicKeyLayout } from './layouts';

/**
 * Liquidity pool
 */
export class Liquidity {
  public programId: PublicKey;

  public poolInfo: PoolInfo;
  public decoded: any;

  coinDecimals: number;
  pcDecimals: number;
  lpDecimals: number;

  constructor(
    programId: PublicKey,
    poolInfo: PoolInfo,
    decoded: any,
    coinDecimals: number,
    pcDecimals: number,
    lpDecimals: number,
  ) {
    this.programId = programId;

    this.poolInfo = poolInfo;
    this.decoded = decoded;

    this.coinDecimals = coinDecimals;
    this.pcDecimals = pcDecimals;
    this.lpDecimals = lpDecimals;
  }

  /**
   * Load liquidity pool

   * @param {Connection} connection
   * @param {string | PublicKey} coinMintAddress
   * @param {string | PublicKey} pcMintAddress
   * @param {string} env
   */
  static async load(
    connection: Connection,
    coinMintAddress: string | PublicKey,
    pcMintAddress: string | PublicKey,
    env = 'mainnet',
  ) {
    const poolInfo = throwIfUndefined(
      getPoolByMintAddress(coinMintAddress, pcMintAddress, env),
      'Liquidity pool not found',
    );

    const { data } = throwIfNull(
      await connection.getAccountInfo(poolInfo.ammId),
      'Liquidity pool not found',
    );

    const decoded = this.AmmInfoLayout.decode(data);

    // if (decoded.status != 1) {
    //   throw new Error('Invalid liquidity pool');
    // }

    const [coinDecimals, pcDecimals, lpDecimals] = await Promise.all([
      getMintDecimals(connection, poolInfo.coinMintAddress),
      getMintDecimals(connection, poolInfo.pcMintAddress),
      getMintDecimals(connection, poolInfo.lpMintAddress),
    ]);

    const programId = LIQUIDITY_POOL_PROGRAM_IDS[env];

    return new Liquidity(
      programId,
      poolInfo,
      decoded,
      coinDecimals,
      pcDecimals,
      lpDecimals,
    );
  }

  static AmmInfoLayout = struct([
    nu64('status'),
    nu64('nonce'),
    nu64('orderNum'),
    nu64('depth'),
    nu64('coinDecimals'),
    nu64('pcDecimals'),
    nu64('state'),
    nu64('resetFlag'),
    nu64('fee'),
    nu64('minSize'),
    nu64('volMaxCutRatio'),
    nu64('pnlRatio'),
    nu64('amountWaveRatio'),
    nu64('coinLotSize'),
    nu64('pcLotSize'),
    nu64('minPriceMultiplier'),
    nu64('maxPriceMultiplier'),
    nu64('needTakePnlCoin'),
    nu64('needTakePnlPc'),
    nu64('totalPnlX'),
    nu64('totalPnlY'),
    nu64('systemDecimalsValue'),
    publicKeyLayout('poolCoinTokenAccount'),
    publicKeyLayout('poolPcTokenAccount'),
    publicKeyLayout('coinMintAddress'),
    publicKeyLayout('pcMintAddress'),
    publicKeyLayout('lpMintAddress'),
    publicKeyLayout('ammOpenOrders'),
    publicKeyLayout('serumMarket'),
    publicKeyLayout('serumProgramId'),
    publicKeyLayout('ammTargetOrders'),
    publicKeyLayout('ammQuantities'),
    publicKeyLayout('poolWithdrawQueue'),
    publicKeyLayout('poolTempLpTokenAccount'),
    publicKeyLayout('ammCoinPnlAccount'),
    publicKeyLayout('ammPcPnlAccount'),
  ]);

  /**
   * Deposit two tokens to liquidity pool

   * @param {Connection} connection
   * @param {any} wallet
   * @param {PublicKey} userCoinTokenAccount
   * @param {PublicKey} userPcTokenAccount
   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userOwner
   * @param {number} maxCoinAmount
   * @param {number} maxPcAmount
   * @param {number} tolerate - 1 meaning 0.01%

   * @returns {string} txid
   */
  async addLiquidity(
    connection: Connection,
    wallet: any,
    userCoinTokenAccount: PublicKey,
    userPcTokenAccount: PublicKey,
    userLpTokenAccount: PublicKey,
    userOwner: PublicKey,
    maxCoinAmount: number,
    maxPcAmount: number,
    tolerate: number,
  ): Promise<string> {
    const transaction = new Transaction();
    const signers: Account[] = [];

    transaction.add(
      this.addLiquidityInstruction(
        this.programId,

        this.poolInfo.ammId,
        this.poolInfo.ammAuthority,
        this.poolInfo.ammOpenOrders,
        this.poolInfo.ammQuantities,
        this.poolInfo.lpMintAddress,
        this.poolInfo.poolCoinTokenAccount,
        this.poolInfo.poolPcTokenAccount,

        this.poolInfo.serumMarket,

        userCoinTokenAccount,
        userPcTokenAccount,
        userLpTokenAccount,
        userOwner,

        maxCoinAmount,
        maxPcAmount,
        tolerate,
      ),
    );

    return await sendTransaction(connection, wallet, transaction, signers);
  }

  addLiquidityInstruction(
    programId: PublicKey,
    // tokenProgramId: PublicKey,
    // amm
    ammId: PublicKey,
    ammAuthority: PublicKey,
    ammOpenOrders: PublicKey,
    ammQuantities: PublicKey,
    lpMintAddress: PublicKey,
    poolCoinTokenAccount: PublicKey,
    poolPcTokenAccount: PublicKey,
    // serum
    serumMarket: PublicKey,
    // user
    userCoinTokenAccount: PublicKey,
    userPcTokenAccount: PublicKey,
    userLpTokenAccount: PublicKey,
    userOwner: PublicKey,

    maxCoinAmount: number,
    maxPcAmount: number,
    tolerate: number,
  ): TransactionInstruction {
    const dataLayout = struct([
      u8('instruction'),
      nu64('maxCoinAmount'),
      nu64('maxPcAmount'),
      nu64('tolerate'),
    ]);

    const keys = [
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
      { pubkey: ammId, isSigner: false, isWritable: true },
      { pubkey: ammAuthority, isSigner: false, isWritable: true },
      { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
      { pubkey: ammQuantities, isSigner: false, isWritable: true },
      { pubkey: lpMintAddress, isSigner: false, isWritable: true },
      { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
      { pubkey: serumMarket, isSigner: false, isWritable: true },
      { pubkey: userCoinTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userPcTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userOwner, isSigner: true, isWritable: true },
    ];

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 3,
        maxCoinAmount: maxCoinAmount,
        maxPcAmount: maxPcAmount,
        tolerate: tolerate,
      },
      data,
    );

    return new TransactionInstruction({
      keys,
      programId,
      data,
    });
  }

  /**
   * Withdraw two tokens from liquidity pool

   * @param {Connection} connection
   * @param {any} wallet
   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userCoinTokenAccount
   * @param {PublicKey} userPcTokenAccount
   * @param {PublicKey} userOwner
   * @param {number} amount - lp token amount that want to withdraw

   * @returns {string} txid
   */
  async removeLiquidity(
    connection: Connection,
    wallet: any,
    userLpTokenAccount: PublicKey,
    userCoinTokenAccount: PublicKey,
    userPcTokenAccount: PublicKey,
    userOwner: PublicKey,
    amount: number,
  ): Promise<string> {
    const transaction = new Transaction();
    const signers: Account[] = [];

    transaction.add(
      this.removeLiquidityInstruction(
        this.programId,

        this.poolInfo.ammId,
        this.poolInfo.ammAuthority,
        this.poolInfo.ammOpenOrders,
        this.poolInfo.ammQuantities,
        this.poolInfo.lpMintAddress,
        this.poolInfo.poolCoinTokenAccount,
        this.poolInfo.poolPcTokenAccount,
        this.poolInfo.poolWithdrawQueue,
        this.poolInfo.poolTempLpTokenAccount,

        this.poolInfo.serumProgramId,
        this.poolInfo.serumMarket,
        this.poolInfo.serumCoinVaultAccount,
        this.poolInfo.serumPcVaultAccount,
        this.poolInfo.serumVaultSigner,

        userLpTokenAccount,
        userCoinTokenAccount,
        userPcTokenAccount,
        userOwner,

        amount,
      ),
    );

    return await sendTransaction(connection, wallet, transaction, signers);
  }

  removeLiquidityInstruction(
    programId: PublicKey,
    // tokenProgramId: PublicKey,
    // amm
    ammId: PublicKey,
    ammAuthority: PublicKey,
    ammOpenOrders: PublicKey,
    ammQuantities: PublicKey,
    lpMintAddress: PublicKey,
    poolCoinTokenAccount: PublicKey,
    poolPcTokenAccount: PublicKey,
    poolWithdrawQueue: PublicKey,
    poolTempLpTokenAccount: PublicKey,
    // serum
    serumProgramId: PublicKey,
    serumMarket: PublicKey,
    serumCoinVaultAccount: PublicKey,
    serumPcVaultAccount: PublicKey,
    serumVaultSigner: PublicKey,
    // user
    userLpTokenAccount: PublicKey,
    userCoinTokenAccount: PublicKey,
    userPcTokenAccount: PublicKey,
    userOwner: PublicKey,

    amount: number,
  ): TransactionInstruction {
    const dataLayout = struct([u8('instruction'), nu64('amount')]);

    const keys = [
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
      { pubkey: ammId, isSigner: false, isWritable: true },
      { pubkey: ammAuthority, isSigner: false, isWritable: true },
      { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
      { pubkey: ammQuantities, isSigner: false, isWritable: true },
      { pubkey: lpMintAddress, isSigner: false, isWritable: true },
      { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolWithdrawQueue, isSigner: false, isWritable: true },
      { pubkey: poolTempLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: serumProgramId, isSigner: false, isWritable: true },
      { pubkey: serumMarket, isSigner: false, isWritable: true },
      { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
      { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
      { pubkey: serumVaultSigner, isSigner: false, isWritable: true },
      { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userCoinTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userPcTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userOwner, isSigner: true, isWritable: true },
    ];

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 4,
        amount: amount,
      },
      data,
    );

    return new TransactionInstruction({
      keys,
      programId,
      data,
    });
  }

  async getAmmInfo(connection: Connection) {
    const info = await connection.getAccountInfo(this.poolInfo.ammId);

    return Liquidity.AmmInfoLayout.decode(info?.data);
  }

  /**
   * Get this liquidity pool unused balance
   */
  async getUnusedBalance(connection: Connection) {
    const { poolCoinTokenAccount, poolPcTokenAccount } = this.poolInfo;

    const poolCoinInfo = await connection.getTokenAccountBalance(
      poolCoinTokenAccount,
    );
    const poolPcInfo = await connection.getTokenAccountBalance(
      poolPcTokenAccount,
    );

    return {
      unusedCoin: parseInt(poolCoinInfo.value.amount),
      unusedPc: parseInt(poolPcInfo.value.amount),
    };
  }

  /**
   * Get this liquidity pool's open orders
   */
  async getOpenOrders(connection: Connection) {
    const accountInfo = await connection.getAccountInfo(
      this.poolInfo.ammOpenOrders,
    );

    let baseTokenTotal = 0;
    let quoteTokenTotal = 0;

    if (!accountInfo) {
      return { baseTokenTotal, quoteTokenTotal };
    }

    const openOrders = OpenOrders.fromAccountInfo(
      this.poolInfo.ammOpenOrders,
      accountInfo,
      this.poolInfo.serumProgramId,
    );

    baseTokenTotal = openOrders.baseTokenTotal.toNumber();
    quoteTokenTotal = openOrders.quoteTokenTotal.toNumber();

    return { baseTokenTotal, quoteTokenTotal };
  }

  /**
   * Get this liquidity pool's total balances
   */
  async getPoolBalance(connection: Connection) {
    const { unusedCoin, unusedPc } = await this.getUnusedBalance(connection);

    const { baseTokenTotal, quoteTokenTotal } = await this.getOpenOrders(
      connection,
    );

    const { needTakePnlCoin, needTakePnlPc } = await this.getAmmInfo(
      connection,
    );

    const coinBalance = unusedCoin + baseTokenTotal - needTakePnlCoin;
    const pcBalance = unusedPc + quoteTokenTotal - needTakePnlPc;

    return { coin: coinBalance, pc: pcBalance };
  }
}
