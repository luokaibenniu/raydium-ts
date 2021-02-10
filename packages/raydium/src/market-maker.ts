import {
  Account,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import { getProgramId, getMarketParams } from './ids';
import { depositInstruction } from './instructions';
import { sendTransaction } from './transactions';

interface DepositParams {
  pairName: string;
  userTokenAccountA: PublicKey;
  userTokenAccountB: PublicKey;
  tokenAccountOwnerA: PublicKey;
  tokenAccountOwnerB: PublicKey;
  maxAmountA: number;
  maxAmountB: number;
  tolerate: number;
}

export async function deposit(
  connection: Connection,
  wallet: any,
  {
    pairName,
    userTokenAccountA,
    userTokenAccountB,
    tokenAccountOwnerA,
    tokenAccountOwnerB,
    maxAmountA,
    maxAmountB,
    tolerate,
  }: DepositParams,
  awaitConfirmation = true,
): Promise<string> {
  const instructions: TransactionInstruction[] = [];
  const cleanupInstructions: TransactionInstruction[] = [];
  const signers: Account[] = [];

  const programId = getProgramId();

  const tradePair = getMarketParams(pairName);

  instructions.push(
    depositInstruction(
      programId,
      tradePair.amm,
      tradePair.authority,
      tradePair.openOrders,
      tradePair.lpMintAddress,
      tradePair.poolTokenAccountA,
      tradePair.poolTokenAccountB,
      tradePair.market,
      userTokenAccountA,
      userTokenAccountB,
      tradePair.poolLpAccount,
      tokenAccountOwnerA,
      tokenAccountOwnerB,
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
