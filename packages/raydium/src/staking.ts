import {
  Account,
  Connection,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { STAKE_PROGRAM_IDS, TOKEN_PROGRAM_ID } from './ids';
import { getFilteredProgramAccounts, sendTransaction } from './transactions';
import { nu64, struct, u8 } from 'buffer-layout';

import { FarmInfo } from './types';
import { getFarmByLpMintAddress } from './farms';
import { publicKeyLayout } from './layouts';

/**
 * Staking pool
 * @constructor
 * @param {Connection} connection
 * @param {any} wallet
 * @param {string | PublicKey} lpMintAddress
 * @param {string} [env='mainnet']
 */
export class Staking {
  private connection: Connection;
  private wallet: any;

  private programId: PublicKey;

  public poolInfo: FarmInfo;

  constructor(
    connection: Connection,
    wallet: any,
    lpMintAddress: string | PublicKey,
    env = 'mainnet',
  ) {
    const poolInfo = getFarmByLpMintAddress(lpMintAddress, env);

    if (!poolInfo) {
      throw new Error('Invalid staking pool');
    }

    this.connection = connection;
    this.wallet = wallet;

    this.programId = STAKE_PROGRAM_IDS[env];
    this.poolInfo = poolInfo;
  }

  static StakePoolInfoLayout = struct([
    nu64('state'),
    nu64('nonce'),
    publicKeyLayout('poolLpTokenAccount'),
    publicKeyLayout('poolRewardTokenAccount'),
    publicKeyLayout('owner'),
    publicKeyLayout('feeOwner'),
    nu64('feeY'),
    nu64('feeX'),
    nu64('totalReward'),
    nu64('rewardPerShareNet'),
    nu64('lastBlock'),
    nu64('rewardPerBlock'),
  ]);

  static UserInfoLayout = struct([
    nu64('state'),
    publicKeyLayout('poolId'),
    publicKeyLayout('stakerOwner'),
    nu64('depositBalance'),
    nu64('rewardDebt'),
  ]);

  async getUserInfoAccount() {
    const filters = [
      {
        memcmp: {
          offset: 8,
          bytes: this.poolInfo.poolId.toBase58(),
        },
      },
      {
        memcmp: {
          offset: 40,
          bytes: this.wallet.publicKey.toBase58(),
        },
      },
      {
        dataSize: Staking.UserInfoLayout.span,
      },
    ];

    return await getFilteredProgramAccounts(
      this.connection,
      this.programId,
      filters,
    );
  }

  /**
   * Deposit lp token to staking pool

   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userRewardTokenAccount
   * @param {number} amount
   * @param {boolean} [awaitConfirmation=true]

   * @returns {string} txid
   */
  async deposit(
    userLpTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    amount: number,

    awaitConfirmation = true,
  ): Promise<string> {
    const instructions: TransactionInstruction[] = [];
    const cleanupInstructions: TransactionInstruction[] = [];
    const signers: Account[] = [];

    const userInfoAccounts = await this.getUserInfoAccount();
    let userInfoAccount;
    let isNew = false;

    if (userInfoAccounts.length > 0) {
      userInfoAccount = userInfoAccounts[0].publicKey;
    } else {
      const newUserInfoAccount = new Account();

      instructions.push(
        await SystemProgram.createAccount({
          fromPubkey: this.wallet.publicKey,
          newAccountPubkey: newUserInfoAccount.publicKey,
          lamports: await this.connection.getMinimumBalanceForRentExemption(
            Staking.UserInfoLayout.span,
          ),
          space: Staking.UserInfoLayout.span,
          programId: this.programId,
        }),
      );

      isNew = true;
      userInfoAccount = newUserInfoAccount.publicKey;
      signers.push(newUserInfoAccount);
    }

    instructions.push(
      this.depositInstruction(
        this.programId,
        this.poolInfo.poolId,
        this.poolInfo.poolAuthority,
        userInfoAccount,
        this.wallet.publicKey,
        userLpTokenAccount,
        this.poolInfo.poolLpTokenAccount,
        userRewardTokenAccount,
        this.poolInfo.poolRewardTokenAccount,
        amount,
        isNew,
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

  depositInstruction(
    programId: PublicKey,
    // staking pool
    poolId: PublicKey,
    poolAuthority: PublicKey,
    // user
    userInfoAccount: PublicKey,
    userOwner: PublicKey,
    userLpTokenAccount: PublicKey,
    poolLpTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    poolRewardTokenAccount: PublicKey,
    // tokenProgramId: PublicKey,
    amount: number,
    isNew: boolean,
  ): TransactionInstruction {
    const dataLayout = struct([u8('instruction'), nu64('amount')]);

    const keys = [
      { pubkey: poolId, isSigner: false, isWritable: true },
      { pubkey: poolAuthority, isSigner: false, isWritable: true },
      { pubkey: userInfoAccount, isSigner: isNew, isWritable: true },
      { pubkey: userOwner, isSigner: true, isWritable: true },
      { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
    ];

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 1,
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

  /**
   * Withdraw lp token from staking pool

   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userRewardTokenAccount
   * @param {number} amount
   * @param {boolean} [awaitConfirmation=true]

   * @returns {string} txid
   */
  async withdraw(
    userLpTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    amount: number,

    awaitConfirmation = true,
  ): Promise<string> {
    const instructions: TransactionInstruction[] = [];
    const cleanupInstructions: TransactionInstruction[] = [];
    const signers: Account[] = [];

    const userInfoAccounts = await this.getUserInfoAccount();
    const userInfoAccount = userInfoAccounts[0].publicKey;

    instructions.push(
      this.withdrawInstruction(
        this.programId,
        this.poolInfo.poolId,
        this.poolInfo.poolAuthority,
        userInfoAccount,
        this.wallet.publicKey,
        userLpTokenAccount,
        this.poolInfo.poolLpTokenAccount,
        userRewardTokenAccount,
        this.poolInfo.poolRewardTokenAccount,
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

  withdrawInstruction(
    programId: PublicKey,
    // staking pool
    poolId: PublicKey,
    poolAuthority: PublicKey,
    // user
    userInfoAccount: PublicKey,
    userOwner: PublicKey,
    userLpTokenAccount: PublicKey,
    poolLpTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    poolRewardTokenAccount: PublicKey,
    // tokenProgramId: PublicKey,
    amount: number,
  ): TransactionInstruction {
    const dataLayout = struct([u8('instruction'), nu64('amount')]);

    const keys = [
      { pubkey: poolId, isSigner: false, isWritable: true },
      { pubkey: poolAuthority, isSigner: false, isWritable: true },
      { pubkey: userInfoAccount, isSigner: false, isWritable: true },
      { pubkey: userOwner, isSigner: true, isWritable: true },
      { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
    ];

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2,
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

  async getStakeInfo() {
    const info = await this.connection.getAccountInfo(this.poolInfo.poolId);

    return Staking.StakePoolInfoLayout.decode(info?.data);
  }

  /**
   * Get user stake info
   */
  async getUserInfo() {
    const userInfoAccounts = await this.getUserInfoAccount();

    return Staking.UserInfoLayout.decode(userInfoAccounts[0].accountInfo.data);
  }

  /**
   * Get staking pool info
   */
  async getPoolInfo() {
    const stakeInfo = await this.getStakeInfo();
    const stakeLpInfo = await this.connection.getTokenAccountBalance(
      this.poolInfo.poolLpTokenAccount,
    );
    const rewardInfo = await this.connection.getTokenAccountBalance(
      this.poolInfo.poolRewardTokenAccount,
    );

    const { rewardPerBlock } = stakeInfo;

    return {
      reward: {
        perBlock: rewardPerBlock,
        decimals: rewardInfo.value.decimals,
      },
      lp: {
        balance: parseInt(stakeLpInfo.value.amount),
        decimals: stakeLpInfo.value.decimals,
      },
    };
  }

  /**
   * Get user pending reward
   */
  async getPendingReward() {
    const stakeInfo = await this.getStakeInfo();
    const userInfo = await this.getUserInfo();

    const { rewardPerShareNet } = stakeInfo;
    const { rewardDebt, depositBalance } = userInfo;

    return (depositBalance * rewardPerShareNet) / 1e9 - rewardDebt;
  }
}
