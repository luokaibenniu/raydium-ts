import { struct, u8, nu64 } from 'buffer-layout';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from './ids';

export function depositInstruction(
  programId: PublicKey,
  amm: PublicKey,
  authority: PublicKey,
  // tokenProgramId: PublicKey,
  openOrders: PublicKey,
  lpMintAddress: PublicKey,
  poolTokenAccountA: PublicKey,
  poolTokenAccountB: PublicKey,
  market: PublicKey,
  // user
  userTokenAccountA: PublicKey,
  userTokenAccountB: PublicKey,

  poolLpAccount: PublicKey,
  // user
  tokenAccountOwnerA: PublicKey,
  tokenAccountOwnerB: PublicKey,

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
    { pubkey: amm, isSigner: false, isWritable: true },
    { pubkey: authority, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
    { pubkey: openOrders, isSigner: false, isWritable: true },
    { pubkey: lpMintAddress, isSigner: false, isWritable: true },
    { pubkey: poolTokenAccountA, isSigner: false, isWritable: true },
    { pubkey: poolTokenAccountB, isSigner: false, isWritable: true },
    { pubkey: market, isSigner: false, isWritable: true },
    { pubkey: userTokenAccountA, isSigner: false, isWritable: true },
    { pubkey: userTokenAccountB, isSigner: false, isWritable: true },
    { pubkey: poolLpAccount, isSigner: false, isWritable: true },
    { pubkey: tokenAccountOwnerA, isSigner: true, isWritable: true },
    { pubkey: tokenAccountOwnerB, isSigner: true, isWritable: true },
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
