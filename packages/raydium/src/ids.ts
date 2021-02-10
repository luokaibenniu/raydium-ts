import { PublicKey } from '@solana/web3.js';

// SPL TOKEN
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export const PROGRAM_IDS = {
  mainnet: new PublicKey('7mkSRhsJMnAGFngJxpJ52ikRa24TY53ZWKEjwJ4nyYGC'),
};

interface MarketInfo {
  amm: PublicKey;
  authority: PublicKey;

  openOrders: PublicKey;

  lpMintAddress: PublicKey;

  poolTokenAccountA: PublicKey;
  poolTokenAccountB: PublicKey;

  market: PublicKey;

  targetOrders: PublicKey;
  quantities: PublicKey;
  withdrawQueue: PublicKey;
  poolTempLpAccount: PublicKey;
  poolLpAccount: PublicKey;

  nonce: number;
}

export const MARKET_PARAMS = {
  'SUSHI-USDT': {
    mainnet: {
      amm: new PublicKey('4zGmsWTRx9NCch54vMhAZ3SqWYqjgYJ38yzJGDXedfGD'),
      authority: new PublicKey('5f1SAckvVPdCR3Y9GNTZf8YJFCCabMeKbJZjDhFMCDpM'),

      openOrders: new PublicKey('BMC84Rqb5ueVJM9QEewKVJkZKq5WWEV4bLrFrRkKEHPK'),

      lpMintAddress: new PublicKey(
        'C5d9j6FPH6x2rRaf8FXxxChor7mg1XRAcDuEPrXLZGZb',
      ),

      poolTokenAccountA: new PublicKey(
        'G8jLmjCkdtbUdMLiwaWy7fKgrsr9dMMyzpc7a4eMSxLU',
      ),
      poolTokenAccountB: new PublicKey(
        '8DmRtSevRDEBVrTBUHoW8v1rGyzacfQWdkNVbW9s9Y8Z',
      ),

      market: new PublicKey('4uZTPc72sCDcVRfKKii67dTPm2Xe4ri3TYnGcUQrtnU9'),

      targetOrders: new PublicKey(
        'CUXqaFx4e3Ci6crR8etzbaU7QF36gJuu4wAgaWwcp4Rd',
      ),
      quantities: new PublicKey('A3cJEEgwnRK8DT7C4YSEGYTJynzjTJxRz91XaECrB9xA'),
      withdrawQueue: new PublicKey(
        '8Dx9v8y2LPDiwUW3rUaFiT56rga2HyULWiavxh8vWKe',
      ),
      poolTempLpAccount: new PublicKey(
        'FKEyf5np8PGKZEdSzQKWkjFwQRz8q4z6dLbg36n5AKbB',
      ),
      poolLpAccount: new PublicKey(
        'DcC1Bhk9e53EqLESSZG8vLv6fsHoCvYwwppkoFUKuoCU',
      ),

      nonce: 255,
    },
  },
};

export function getProgramId(env = 'mainnet'): PublicKey {
  return PROGRAM_IDS[env];
}

export function getMarketParams(pair: string, env = 'mainnet'): MarketInfo {
  return MARKET_PARAMS[pair][env];
}
