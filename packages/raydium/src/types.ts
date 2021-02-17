import { PublicKey, TokenAccountBalancePair } from '@solana/web3.js';

export interface TokenInfo {
  symbol?: string;
  name: string;
  mintAddress: PublicKey;
  decimals: number;
}

export interface PoolInfo {
  name: string;
  coinMintAddress: PublicKey;
  pcMintAddress: PublicKey;

  ammId: PublicKey;
  ammAuthority: PublicKey;
  ammOpenOrders: PublicKey;
  ammTargetOrders: PublicKey;
  ammQuantities: PublicKey;
  lpMintAddress: PublicKey;
  poolCoinTokenAccount: PublicKey;
  poolPcTokenAccount: PublicKey;
  poolWithdrawQueue: PublicKey;
  poolTempLpTokenAccount: PublicKey;

  serumProgramId: PublicKey;
  serumMarket: PublicKey;
  serumCoinVaultAccount: PublicKey;
  serumPcVaultAccount: PublicKey;
  serumVaultSigner: PublicKey;

  nonce: number;
}

export interface TokenAccountInfo extends TokenAccountBalancePair {
  mint: PublicKey;
  owner: PublicKey;
}
