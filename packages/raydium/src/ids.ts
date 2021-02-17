import { PublicKey } from '@solana/web3.js';

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
  // mainnet: new PublicKey('RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr'),
  // devnet: new PublicKey('6PUttG2hA9VLJje28T2LmvP1vcE2iUayHQCiv1m4Xytk'),
};
