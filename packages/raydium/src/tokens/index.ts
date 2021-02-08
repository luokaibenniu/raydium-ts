import MAINNET_TOKENS from './mainnet.json';
import DEVNET_TOKENS from './devnet.json';
import TESTNET_TOKENS from './testnet.json';

export const TOKENS = {
  mainnet: MAINNET_TOKENS,
  devnet: DEVNET_TOKENS,
  testnet: TESTNET_TOKENS,
};

export function getTokenBySymbol(symbol: string, env = 'mainnet') {
  return TOKENS[env].find(token => token.symbol === symbol);
}

export function getTokenByName(name: string, env = 'mainnet') {
  return TOKENS[env].find(token => token.name === name);
}

export function getTokenByMintAddress(mintAddress: string, env = 'mainnet') {
  return TOKENS[env].find(token => token.mintAddress === mintAddress);
}
