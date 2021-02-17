import DEVNET_TOKENS from './devnet';
import MAINNET_TOKENS from './mainnet';
import { PublicKey } from '@solana/web3.js';
import TESTNET_TOKENS from './testnet';
import { TokenInfo } from '../types';

export const TOKENS = {
  mainnet: MAINNET_TOKENS,
  devnet: DEVNET_TOKENS,
  testnet: TESTNET_TOKENS,
};

/**
 * Get token use symbol

 * @param {string} symbol
 * @param {string} [env='mainnet']

 * @returns {TokenInfo|undefined} tokenInfo
 */
export function getTokenBySymbol(
  symbol: string,
  env = 'mainnet',
): TokenInfo | undefined {
  const token = TOKENS[env][symbol];

  if (token) {
    token['symbol'] = symbol;
  }

  return token;
}

/**
 * Get token use mint addresses

 * @param {string | PublicKey} mintAddress
 * @param {string} [env='mainnet']

 * @returns {TokenInfo | undefined} tokenInfo
 */
export function getTokenByMintAddress(
  mintAddress: string | PublicKey,
  env = 'mainnet',
): TokenInfo | undefined {
  let mint = mintAddress;

  if (mint instanceof PublicKey) {
    mint = mint.toBase58();
  }

  let token;

  for (const symbol of Object.keys(TOKENS[env])) {
    const info = TOKENS[env][symbol];

    if (info.mintAddress.toBase58() === mintAddress) {
      token = info;
      token['symbol'] = symbol;
    }
  }

  return token;
}
