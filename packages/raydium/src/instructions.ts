import { struct, u8 } from 'buffer-layout';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from './ids';
import { u64, publicKeyLayout } from './layouts';

/**
 * MarketMaker
 */
export function depositInstruction(
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
    u64('maxCoinAmount'),
    u64('maxPcAmount'),
    u64('tolerate'),
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

export function withdrawInstruction(
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
  const dataLayout = struct([u8('instruction'), u64('amount')]);

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

export function parseMarketMakerInfo(data: Buffer) {
  const dataLayout = struct([
    u64('status'),
    u64('nonce'),
    u64('orderNum'),
    u64('depth'),
    u64('coinDecimals'),
    u64('pcDecimals'),
    u64('state'),
    u64('resetFlag'),
    u64('fee'),
    u64('minSize'),
    u64('volMaxCutRatio'),
    u64('pnlRatio'),
    u64('amountWaveRatio'),
    u64('coinLotSize'),
    u64('pcLotSize'),
    u64('minPriceMultiplier'),
    u64('maxPriceMultiplier'),
    u64('needTakePnlCoin'),
    u64('needTakePnlPc'),
    u64('totalPnlX'),
    u64('totalPnlY'),
    u64('systemDecimalsValue'),
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

  return dataLayout.decode(data);
}
