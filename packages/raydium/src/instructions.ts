import { Layout } from 'buffer-layout';
import { TransactionInstruction } from '@solana/web3.js';

import { DEPOSIT_LAYOUT } from './layouts';

export function encodeData(type, fields) {
  const allocLength =
    type.layout.span >= 0 ? type.layout.span : Layout.getAlloc(type, fields);
  const data = Buffer.alloc(allocLength);
  const layoutFields = Object.assign({ instruction: type.index }, fields);
  type.layout.encode(layoutFields, data);
  return data;
}

export function depositInstruction(
  programId,
  amm,
  auth,
  tokenProgramId,
  openOrders,
  mintPool,
  ammTokenA,
  ammTokenB,
  market,
  depositTokenA,
  depositTokenB,
  lp,
  depositTokenOwnerA,
  depositTokenOwnerB,
  maxAmountA,
  maxAmountB,
  tolerate,
) {
  return new TransactionInstruction({
    keys: [
      { pubkey: amm, isSigner: false, isWritable: true },
      { pubkey: auth, isSigner: false, isWritable: true },
      { pubkey: tokenProgramId, isSigner: false, isWritable: true },
      { pubkey: openOrders, isSigner: false, isWritable: true },
      { pubkey: mintPool, isSigner: false, isWritable: true },
      { pubkey: ammTokenA, isSigner: false, isWritable: true },
      { pubkey: ammTokenB, isSigner: false, isWritable: true },
      { pubkey: market, isSigner: false, isWritable: true },
      { pubkey: depositTokenA, isSigner: false, isWritable: true },
      { pubkey: depositTokenB, isSigner: false, isWritable: true },
      { pubkey: lp, isSigner: false, isWritable: true },
      { pubkey: depositTokenOwnerA, isSigner: true, isWritable: true },
      { pubkey: depositTokenOwnerB, isSigner: true, isWritable: false },
    ],
    programId,
    data: encodeData(DEPOSIT_LAYOUT, {
      instruction: 3,
      maxAmountA: maxAmountA,
      maxAmountB: maxAmountB,
      tolerate: tolerate,
    }),
  });
}

export function withdrawInstruction(
  programId,
  amm,
  auth,
  tokenProgramId,
  openOrders,
  mintPool,
  ammTokenA,
  ammTokenB,
  serumDex,
  market,
  vaultA,
  vaultB,
  lpSource,
  destA,
  destB,
  vaultSigner,
  lpSourceOwner,
  withdraw,
  tempLp,
  amount,
) {
  return new TransactionInstruction({
    keys: [
      { pubkey: amm, isSigner: false, isWritable: true },
      { pubkey: auth, isSigner: false, isWritable: true },
      { pubkey: tokenProgramId, isSigner: false, isWritable: true },
      { pubkey: openOrders, isSigner: false, isWritable: true },
      { pubkey: mintPool, isSigner: false, isWritable: true },
      { pubkey: ammTokenA, isSigner: false, isWritable: true },
      { pubkey: ammTokenB, isSigner: false, isWritable: true },
      { pubkey: serumDex, isSigner: false, isWritable: true },
      { pubkey: market, isSigner: false, isWritable: true },
      { pubkey: vaultA, isSigner: false, isWritable: true },
      { pubkey: vaultB, isSigner: false, isWritable: true },
      { pubkey: lpSource, isSigner: false, isWritable: true },
      { pubkey: destA, isSigner: false, isWritable: true },
      { pubkey: destB, isSigner: false, isWritable: true },
      { pubkey: vaultSigner, isSigner: false, isWritable: true },
      { pubkey: lpSourceOwner, isSigner: true, isWritable: true },
      { pubkey: withdraw, isSigner: false, isWritable: true },
      { pubkey: tempLp, isSigner: false, isWritable: true },
    ],
    programId,
    data: encodeData(DEPOSIT_LAYOUT, {
      instruction: 4,
      amount: amount,
    }),
  });
}

export function withdrawTransferInstruction(
  programId,
  amm,
  auth,
  tokenProgramId,
  openOrders,
  mintPool,
  ammTokenA,
  ammTokenB,
  serumDex,
  market,
  vaultA,
  vaultB,
  vaultSigner,
  withdraw,
  tempLp,
  limit,
) {
  return new TransactionInstruction({
    keys: [
      { pubkey: amm, isSigner: false, isWritable: true },
      { pubkey: auth, isSigner: false, isWritable: true },
      { pubkey: tokenProgramId, isSigner: false, isWritable: true },
      { pubkey: openOrders, isSigner: false, isWritable: true },
      { pubkey: mintPool, isSigner: false, isWritable: true },
      { pubkey: ammTokenA, isSigner: false, isWritable: true },
      { pubkey: ammTokenB, isSigner: false, isWritable: true },
      { pubkey: serumDex, isSigner: false, isWritable: true },
      { pubkey: market, isSigner: false, isWritable: true },
      { pubkey: vaultA, isSigner: false, isWritable: true },
      { pubkey: vaultB, isSigner: false, isWritable: true },
      { pubkey: vaultSigner, isSigner: false, isWritable: true },
      { pubkey: withdraw, isSigner: false, isWritable: true },
      { pubkey: tempLp, isSigner: false, isWritable: true },
    ],
    programId,
    data: encodeData(DEPOSIT_LAYOUT, {
      instruction: 5,
      limit: limit,
    }),
  });
}
