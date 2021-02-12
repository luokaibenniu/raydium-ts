import {
  Account,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import { getProgramId, getMarketParams } from './ids';
import { depositInstruction, withdrawInstruction } from './instructions';
import { sendTransaction } from './transactions';

interface DepositParams {
  pairName: string;
  userCoinTokenAccount: PublicKey;
  userPcTokenAccount: PublicKey;
  userLpTokenAccount: PublicKey;
  userOwner: PublicKey;
  maxAmountA: number;
  maxAmountB: number;
  tolerate: number;
}

interface WithdrawParams {
  pairName: string;
  userLpTokenAccount: PublicKey;
  userCoinTokenAccount: PublicKey;
  userPcTokenAccount: PublicKey;
  userOwner: PublicKey;
  amount: number;
}

export class MarketMaker {
  static async deposit(
    connection: Connection,
    wallet: any,
    {
      pairName,
      userCoinTokenAccount,
      userPcTokenAccount,
      userLpTokenAccount,
      userOwner,
      maxAmountA,
      maxAmountB,
      tolerate,
    }: DepositParams,
    awaitConfirmation = true,
    env = 'mainnet',
  ): Promise<string> {
    const instructions: TransactionInstruction[] = [];
    const cleanupInstructions: TransactionInstruction[] = [];
    const signers: Account[] = [];

    const programId = getProgramId(env);

    const tradePair = getMarketParams(pairName, env);

    instructions.push(
      depositInstruction(
        programId,
        tradePair.ammId,
        tradePair.ammAuthority,
        tradePair.ammOpenOrders,
        tradePair.lpMintAddress,
        tradePair.poolCoinTokenAccount,
        tradePair.poolPcTokenAccount,
        tradePair.serumMarket,
        userCoinTokenAccount,
        userPcTokenAccount,
        userLpTokenAccount,
        userOwner,
        tradePair.ammQuantities,
        maxAmountA,
        maxAmountB,
        tolerate,
      ),
    );

    return await sendTransaction(
      connection,
      wallet,
      instructions.concat(cleanupInstructions),
      signers,
      awaitConfirmation,
    );
  }

  static async withdraw(
    connection: Connection,
    wallet: any,
    {
      pairName,
      userLpTokenAccount,
      userCoinTokenAccount,
      userPcTokenAccount,
      userOwner,
      amount,
    }: WithdrawParams,
    awaitConfirmation = true,
    env = 'mainnet',
  ): Promise<string> {
    const instructions: TransactionInstruction[] = [];
    const cleanupInstructions: TransactionInstruction[] = [];
    const signers: Account[] = [];

    const programId = getProgramId(env);

    const tradePair = getMarketParams(pairName, env);

    instructions.push(
      withdrawInstruction(
        programId,
        tradePair.ammId,
        tradePair.ammAuthority,
        tradePair.ammOpenOrders,
        tradePair.lpMintAddress,
        tradePair.poolCoinTokenAccount,
        tradePair.poolPcTokenAccount,
        tradePair.serumProgramId,
        tradePair.serumMarket,
        tradePair.serumCoinVaultAccount,
        tradePair.serumPcVaultAccount,
        userLpTokenAccount,
        userCoinTokenAccount,
        userPcTokenAccount,
        tradePair.serumVaultSigner,
        userOwner,
        tradePair.poolWithdrawQueue,
        tradePair.poolTempLpTokenAccount,
        tradePair.ammQuantities,
        amount,
      ),
    );

    return await sendTransaction(
      connection,
      wallet,
      instructions.concat(cleanupInstructions),
      signers,
      awaitConfirmation,
    );
  }
}
