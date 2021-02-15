import {
  Account,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { OpenOrders } from '@project-serum/serum';

import {
  getProgramId,
  getMarketParams,
  MarketInfo,
  MARKET_PARAMS,
} from './ids';
import {
  depositInstruction,
  withdrawInstruction,
  parseMarketMakerInfo,
} from './instructions';
import { sendTransaction } from './transactions';

/**
 * Get trade pair name use two mint addresses string

 * @param {string} mintAddressA
 * @param {string} mintAddressB
 * @param {string} [env='mainnet']

 * @returns {string|null} pairName
 */
export function getPairNameFromMintAddresses(
  mintAddressA: string,
  mintAddressB: string,
  env = 'mainnet',
) {
  for (const marketName in MARKET_PARAMS) {
    const marketInfo = MARKET_PARAMS[marketName][env];

    if (marketInfo) {
      if (
        (marketInfo.coinMintAddress.toBase58() == mintAddressA &&
          marketInfo.pcMintAddress.toBase58() == mintAddressB) ||
        (marketInfo.coinMintAddress.toBase58() == mintAddressB &&
          marketInfo.pcMintAddress.toBase58() == mintAddressA)
      ) {
        return marketName;
      }
    }
  }

  return null;
}

/**
 * MarketMaker
 * @constructor
 * @param {Connection} connection
 * @param {any} wallet
 * @param {string} pairName
 * @param {string} [env='mainnet']
 */
export class MarketMaker {
  private connection: Connection;
  private wallet: any;

  private programId: PublicKey;
  public pairName: string;
  private tradePairInfo: MarketInfo;

  public marketMakerInfo: any;

  constructor(
    connection: Connection,
    wallet: any,
    pairName: string,
    env = 'mainnet',
  ) {
    const tradePairInfo = getMarketParams(pairName, env);

    if (!tradePairInfo) {
      throw new Error('Unsupported market');
    }

    this.connection = connection;
    this.wallet = wallet;

    this.programId = getProgramId(env);
    this.pairName = pairName;
    this.tradePairInfo = tradePairInfo;

    this.getMarketMakerInfo();
  }

  /**
   * Deposit two tokens to market marker pool

   * @param {PublicKey} userCoinTokenAccount
   * @param {PublicKey} userPcTokenAccount
   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userOwner
   * @param {number} maxCoinAmount
   * @param {number} maxPcAmount
   * @param {number} tolerate - 1 meaning 0.01%
   * @param {boolean} [awaitConfirmation=true]

   * @returns {string} txid
   */
  async deposit(
    userCoinTokenAccount: PublicKey,
    userPcTokenAccount: PublicKey,
    userLpTokenAccount: PublicKey,
    userOwner: PublicKey,
    maxCoinAmount: number,
    maxPcAmount: number,
    tolerate: number,

    awaitConfirmation = true,
  ): Promise<string> {
    const instructions: TransactionInstruction[] = [];
    const cleanupInstructions: TransactionInstruction[] = [];
    const signers: Account[] = [];

    instructions.push(
      depositInstruction(
        this.programId,

        this.tradePairInfo.ammId,
        this.tradePairInfo.ammAuthority,
        this.tradePairInfo.ammOpenOrders,
        this.tradePairInfo.ammQuantities,
        this.tradePairInfo.lpMintAddress,
        this.tradePairInfo.poolCoinTokenAccount,
        this.tradePairInfo.poolPcTokenAccount,

        this.tradePairInfo.serumMarket,

        userCoinTokenAccount,
        userPcTokenAccount,
        userLpTokenAccount,
        userOwner,

        maxCoinAmount,
        maxPcAmount,
        tolerate,
      ),
    );

    return await sendTransaction(
      this.connection,
      this.wallet,
      instructions.concat(cleanupInstructions),
      signers,
      awaitConfirmation,
    );
  }

  /**
   * Withdraw two tokens from market marker pool

   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userCoinTokenAccount
   * @param {PublicKey} userPcTokenAccount
   * @param {PublicKey} userOwner
   * @param {number} amount - lp token amount that want to withdraw
   * @param {boolean} [awaitConfirmation=true]

   * @returns {string} txid
   */
  async withdraw(
    userLpTokenAccount: PublicKey,
    userCoinTokenAccount: PublicKey,
    userPcTokenAccount: PublicKey,
    userOwner: PublicKey,
    amount: number,

    awaitConfirmation = true,
  ): Promise<string> {
    const instructions: TransactionInstruction[] = [];
    const cleanupInstructions: TransactionInstruction[] = [];
    const signers: Account[] = [];

    instructions.push(
      withdrawInstruction(
        this.programId,

        this.tradePairInfo.ammId,
        this.tradePairInfo.ammAuthority,
        this.tradePairInfo.ammOpenOrders,
        this.tradePairInfo.ammQuantities,
        this.tradePairInfo.lpMintAddress,
        this.tradePairInfo.poolCoinTokenAccount,
        this.tradePairInfo.poolPcTokenAccount,
        this.tradePairInfo.poolWithdrawQueue,
        this.tradePairInfo.poolTempLpTokenAccount,

        this.tradePairInfo.serumProgramId,
        this.tradePairInfo.serumMarket,
        this.tradePairInfo.serumCoinVaultAccount,
        this.tradePairInfo.serumPcVaultAccount,
        this.tradePairInfo.serumVaultSigner,

        userLpTokenAccount,
        userCoinTokenAccount,
        userPcTokenAccount,
        userOwner,

        amount,
      ),
    );

    return await sendTransaction(
      this.connection,
      this.wallet,
      instructions.concat(cleanupInstructions),
      signers,
      awaitConfirmation,
    );
  }

  /**
   * Get this market maker infomations
   */
  async getMarketMakerInfo() {
    const accountInfo = await this.connection.getAccountInfo(
      this.tradePairInfo.ammId,
    );

    if (!accountInfo?.data) {
      throw new Error('Invaild account info');
    }

    const marketMakerInfo = parseMarketMakerInfo(accountInfo?.data);

    this.marketMakerInfo = marketMakerInfo;

    return marketMakerInfo;
  }

  /**
   * Get this pool unused balance
   */
  async getPoolUnusedBalance() {
    const { poolCoinTokenAccount, poolPcTokenAccount } = this.marketMakerInfo;

    const poolCoinInfo = await this.connection.getTokenAccountBalance(
      poolCoinTokenAccount,
    );
    const poolPcInfo = await this.connection.getTokenAccountBalance(
      poolPcTokenAccount,
    );

    return {
      unusedCoinBalance: parseInt(poolCoinInfo.value.amount),
      unusedPcBalance: parseInt(poolPcInfo.value.amount),
    };
  }

  /**
   * Get this market maker's open orders
   */
  async getOpenOrders() {
    const accountInfo = await this.connection.getAccountInfo(
      this.marketMakerInfo.ammOpenOrders,
    );

    let baseTokenTotal = 0;
    let quoteTokenTotal = 0;

    if (!accountInfo) {
      return { baseTokenTotal, quoteTokenTotal };
    }

    const openOrders = OpenOrders.fromAccountInfo(
      this.marketMakerInfo.ammOpenOrders,
      accountInfo,
      this.marketMakerInfo.serumProgramId,
    );

    baseTokenTotal = openOrders.baseTokenTotal.toNumber();
    quoteTokenTotal = openOrders.quoteTokenTotal.toNumber();

    return { baseTokenTotal, quoteTokenTotal };
  }

  /**
   * Get this market maker's total balances
   */
  async getPoolBalance() {
    const {
      unusedCoinBalance,
      unusedPcBalance,
    } = await this.getPoolUnusedBalance();

    const { baseTokenTotal, quoteTokenTotal } = await this.getOpenOrders();

    const coinBalance = unusedCoinBalance + baseTokenTotal;
    const pcBalance = unusedPcBalance + quoteTokenTotal;

    return { coinBalance, pcBalance };
  }
}
