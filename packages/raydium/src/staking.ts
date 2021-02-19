import {
  Account,
  Connection,
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { STAKE_PROGRAM_IDS, TOKEN_PROGRAM_ID } from './ids';
import {
  getFilteredProgramAccounts,
  getMintDecimals,
  sendTransaction,
} from './web3';
import { nu64, struct, u8 } from 'buffer-layout';
import { throwIfNull, throwIfUndefined } from './errors';

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
  private programId: PublicKey;

  private farmInfo: FarmInfo;
  private decoded: any;

  lpDecimals: number;
  rewardDecimals: number;

  constructor(
    programId: PublicKey,
    farmInfo: FarmInfo,
    decoded: any,
    lpDecimals: number,
    rewardDecimals: number,
  ) {
    this.programId = programId;

    this.farmInfo = farmInfo;
    this.decoded = decoded;

    this.lpDecimals = lpDecimals;
    this.rewardDecimals = rewardDecimals;
  }

  static async load(
    connection: Connection,
    wallet: any,
    lpMintAddress: string | PublicKey,
    env = 'mainnet',
  ) {
    const farmInfo = throwIfUndefined(
      getFarmByLpMintAddress(lpMintAddress, env),
      'Staking pool not found',
    );

    const { data } = throwIfNull(
      await connection.getAccountInfo(farmInfo.poolId),
      'Staking pool not found',
    );

    const decoded = this.StakeInfoLayout.decode(data);

    const [lpDecimals, rewardDecimals] = await Promise.all([
      getMintDecimals(connection, farmInfo.lpMintAddress),
      getMintDecimals(connection, farmInfo.rewardMintAddress),
    ]);

    const programId = STAKE_PROGRAM_IDS[env];

    return new Staking(
      programId,
      farmInfo,
      decoded,
      lpDecimals,
      rewardDecimals,
    );
  }

  static StakeInfoLayout = struct([
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

  async getUserInfoAccount(connection: Connection, wallet: any) {
    const filters = [
      {
        memcmp: {
          offset: 8,
          bytes: this.farmInfo.poolId.toBase58(),
        },
      },
      {
        memcmp: {
          offset: 40,
          bytes: wallet.publicKey.toBase58(),
        },
      },
      {
        dataSize: Staking.UserInfoLayout.span,
      },
    ];

    return await getFilteredProgramAccounts(
      connection,
      this.programId,
      filters,
    );
  }

  /**
   * Deposit lp token to staking pool

   * @param {PublicKey} userLpTokenAccount
   * @param {PublicKey} userRewardTokenAccount
   * @param {number} amount

   * @returns {string} txid
   */
  async deposit(
    connection: Connection,
    wallet: any,
    userLpTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    amount: number,
  ): Promise<string> {
    const transaction = new Transaction();
    const signers: Account[] = [];

    const userInfoAccounts = await this.getUserInfoAccount(connection, wallet);
    let userInfoAccount;
    let isNew = false;

    if (userInfoAccounts.length > 0) {
      userInfoAccount = userInfoAccounts[0].publicKey;
    } else {
      const newUserInfoAccount = new Account();

      transaction.add(
        await SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: newUserInfoAccount.publicKey,
          lamports: await connection.getMinimumBalanceForRentExemption(
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

    transaction.add(
      this.depositInstruction(
        this.programId,
        this.farmInfo.poolId,
        this.farmInfo.poolAuthority,
        userInfoAccount,
        wallet.publicKey,
        userLpTokenAccount,
        this.farmInfo.poolLpTokenAccount,
        userRewardTokenAccount,
        this.farmInfo.poolRewardTokenAccount,
        amount,
        isNew,
      ),
    );

    return await sendTransaction(connection, wallet, transaction, signers);
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

   * @returns {string} txid
   */
  async withdraw(
    connection: Connection,
    wallet: any,
    userLpTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    amount: number,
  ): Promise<string> {
    const transaction = new Transaction();
    const signers: Account[] = [];

    const userInfoAccounts = await this.getUserInfoAccount(connection, wallet);
    const userInfoAccount = userInfoAccounts[0].publicKey;

    transaction.add(
      this.withdrawInstruction(
        this.programId,
        this.farmInfo.poolId,
        this.farmInfo.poolAuthority,
        userInfoAccount,
        wallet.publicKey,
        userLpTokenAccount,
        this.farmInfo.poolLpTokenAccount,
        userRewardTokenAccount,
        this.farmInfo.poolRewardTokenAccount,
        amount,
      ),
    );

    return await sendTransaction(connection, wallet, transaction, signers);
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

  async getStakeInfo(connection: Connection) {
    const info = await connection.getAccountInfo(this.farmInfo.poolId);

    return Staking.StakeInfoLayout.decode(info?.data);
  }

  /**
   * Get user stake info
   */
  async getUserInfo(connection: Connection, wallet: any) {
    const userInfoAccounts = await this.getUserInfoAccount(connection, wallet);

    return Staking.UserInfoLayout.decode(userInfoAccounts[0].accountInfo.data);
  }

  /**
   * Get staking pool info
   */
  async getPoolInfo(connection: Connection) {
    const stakeInfo = await this.getStakeInfo(connection);
    const stakeLpInfo = await connection.getTokenAccountBalance(
      this.farmInfo.poolLpTokenAccount,
    );

    const { rewardPerBlock } = stakeInfo;

    return {
      rewardPerBlock,
      lpBalance: parseInt(stakeLpInfo.value.amount),
    };
  }

  /**
   * Get user pending reward
   */
  async getPendingReward(connection: Connection, wallet: any) {
    const stakeInfo = await this.getStakeInfo(connection);
    const userInfo = await this.getUserInfo(connection, wallet);

    const { rewardPerShareNet } = stakeInfo;
    const { rewardDebt, depositBalance } = userInfo;

    return (depositBalance * rewardPerShareNet) / 1e9 - rewardDebt;
  }
}
