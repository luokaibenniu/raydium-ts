import DEVNET_FARMS from './devnet';
import { FarmInfo } from '../types';
import MAINNET_FARMS from './mainnet';
import { PublicKey } from '@solana/web3.js';
import TESTNET_FARMS from './testnet';

export const FARMS = {
  mainnet: MAINNET_FARMS,
  devnet: DEVNET_FARMS,
  testnet: TESTNET_FARMS,
};

/**
 * Get farm use lp mint addresses

 * @param {string | PublicKey} lpMintAddress
 * @param {string} [env='mainnet']

 * @returns {FarmInfo | undefined} farmInfo
 */
export function getFarmByLpMintAddress(
  lpMintAddress: string | PublicKey,
  env = 'mainnet',
): FarmInfo | undefined {
  let mint = lpMintAddress;

  if (mint instanceof PublicKey) {
    mint = mint.toBase58();
  }

  return FARMS[env].find(farm => farm.lpMintAddress.toBase58() === mint);
}
