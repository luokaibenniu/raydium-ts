import DEVNET_POOLS from './devnet';
import MAINNET_POOLS from './mainnet';
import { PoolInfo } from '../types';
import { PublicKey } from '@solana/web3.js';
import TESTNET_POOLS from './testnet';

export const POOLS = {
  mainnet: MAINNET_POOLS,
  devnet: DEVNET_POOLS,
  testnet: TESTNET_POOLS,
};

/**
 * Get pool use two mint addresses

 * @param {string | PublicKey} coinMintAddress
 * @param {string | PublicKey} pcMintAddress
 * @param {string} [env='mainnet']

 * @returns {PoolInfo | undefined} poolInfo
 */
export function getPoolByMintAddress(
  coinMintAddress: string | PublicKey,
  pcMintAddress: string | PublicKey,
  env = 'mainnet',
): PoolInfo | undefined {
  let coinMint = coinMintAddress;
  let pcMint = pcMintAddress;

  if (coinMint instanceof PublicKey) {
    coinMint = coinMint.toBase58();
  }
  if (pcMint instanceof PublicKey) {
    pcMint = pcMint.toBase58();
  }

  return POOLS[env].find(
    pool =>
      (pool.coinMintAddress.toBase58() === coinMint &&
        pool.pcMintAddress.toBase58() === pcMint) ||
      (pool.coinMintAddress.toBase58() === pcMint &&
        pool.pcMintAddress.toBase58() === coinMint),
  );
}
