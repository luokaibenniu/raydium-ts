import { struct, u8, nu64 } from 'buffer-layout';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from './ids';

export function depositInstruction(
  programId: PublicKey,
  ammId: PublicKey,
  ammAuthority: PublicKey,
  // tokenProgramId: PublicKey,
  ammOpenOrders: PublicKey,
  lpMintAddress: PublicKey,
  poolCoinTokenAccount: PublicKey,
  poolPcTokenAccount: PublicKey,
  serumMarket: PublicKey,
  // user
  userCoinTokenAccount: PublicKey,
  userPcTokenAccount: PublicKey,
  userLpTokenAccount: PublicKey,

  // owner
  userOwner: PublicKey,

  quantities: PublicKey,

  maxAmountA: number,
  maxAmountB: number,
  tolerate: number,
): TransactionInstruction {
  const dataLayout = struct([
    u8('instruction'),
    nu64('maxAmountA'),
    nu64('maxAmountB'),
    nu64('tolerate'),
  ]);

  const keys = [
    { pubkey: ammId, isSigner: false, isWritable: true },
    { pubkey: ammAuthority, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
    { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: lpMintAddress, isSigner: false, isWritable: true },
    { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
    { pubkey: serumMarket, isSigner: false, isWritable: true },
    { pubkey: userCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userPcTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: true, isWritable: true },
    { pubkey: quantities, isSigner: false, isWritable: true },
  ];

  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: 3,
      maxAmountA: maxAmountA,
      maxAmountB: maxAmountB,
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

export function withdrawInstruction(
  programId: PublicKey,
  ammId: PublicKey,
  ammAuthority: PublicKey,
  // tokenProgramId: PublicKey,
  ammOpenOrders: PublicKey,
  lpMintAddress: PublicKey,
  poolCoinTokenAccount: PublicKey,
  poolPcTokenAccount: PublicKey,
  serumProgramId: PublicKey,
  serumMarket: PublicKey,
  serumCoinVaultAccount: PublicKey,
  serumPcVaultAccount: PublicKey,
  // user
  userLpTokenAccount: PublicKey,
  userCoinTokenAccount: PublicKey,
  userPcTokenAccount: PublicKey,
  serumVaultSigner: PublicKey,

  // owner
  userOwner: PublicKey,

  poolWithdrawQueue: PublicKey,
  poolTempLpTokenAccount: PublicKey,
  quantities: PublicKey,

  amount: number,
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), nu64('amount')]);

  const keys = [
    { pubkey: ammId, isSigner: false, isWritable: true },
    { pubkey: ammAuthority, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
    { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: lpMintAddress, isSigner: false, isWritable: true },
    { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
    { pubkey: serumProgramId, isSigner: false, isWritable: true },
    { pubkey: serumMarket, isSigner: false, isWritable: true },
    { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
    { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userPcTokenAccount, isSigner: false, isWritable: true },
    { pubkey: serumVaultSigner, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: true, isWritable: true },
    { pubkey: poolWithdrawQueue, isSigner: false, isWritable: true },
    { pubkey: poolTempLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: quantities, isSigner: false, isWritable: true },
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
