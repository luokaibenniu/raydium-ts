import { PublicKey } from '@solana/web3.js';

export const WRAPPED_SOL_MINT = new PublicKey(
  'So11111111111111111111111111111111111111112',
);

// SPL TOKEN
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export const SERUM_PROGRAM_IDS_V2 = {
  mainnet: new PublicKey('EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o'),
};

export const LIQUIDITY_POOL_PROGRAM_IDS = {
  mainnet: new PublicKey('RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr'),
  devnet: new PublicKey('6PUttG2hA9VLJje28T2LmvP1vcE2iUayHQCiv1m4Xytk'),
};

export const STAKE_PROGRAM_IDS = {
  mainnet: new PublicKey('FZRkfi9bpjAcjukmgCNa3tVpZ98m7yFr8F8R6TWaexcs'),
  // devnet: new PublicKey('6PUttG2hA9VLJje28T2LmvP1vcE2iUayHQCiv1m4Xytk'),
  testnet: new PublicKey('GaB2BKGPefabDCvZZxjHCf56JHaGb2PjkrAFDp6wcT8d'),
};
