import { PublicKey, TokenAccountBalancePair } from '@solana/web3.js';

export interface TokenInfo {
  symbol?: string;
  name: string;
  mintAddress: PublicKey;
  decimals: number;
}

export interface TokenAccountInfo extends TokenAccountBalancePair {
  mint: PublicKey;
  owner: PublicKey;
}

export interface PoolInfo {
  name: string;
  coinMintAddress: PublicKey;
  pcMintAddress: PublicKey;
  lpMintAddress: PublicKey;

  ammId: PublicKey;
  ammAuthority: PublicKey;
  ammOpenOrders: PublicKey;
  ammTargetOrders: PublicKey;
  ammQuantities: PublicKey;

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

export interface FarmInfo {
  lpMintAddress: PublicKey;
  rewardMintAddress: PublicKey;

  poolId: PublicKey;
  poolAuthority: PublicKey;

  poolLpTokenAccount: PublicKey;
  poolRewardTokenAccount: PublicKey;

  nonce: number;
}

export interface SwapConfig {
  slippage: number;
  partialFill: boolean;
}
