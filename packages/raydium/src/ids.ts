import { PublicKey } from '@solana/web3.js';

// SPL TOKEN
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export const PROGRAM_IDS = {
  // mainnet: new PublicKey(''),
  devnet: new PublicKey('6PUttG2hA9VLJje28T2LmvP1vcE2iUayHQCiv1m4Xytk'),
};

export interface MarketInfo {
  ammId: PublicKey;
  ammAuthority: PublicKey;
  ammOpenOrders: PublicKey;
  ammTargetOrders: PublicKey;
  ammQuantities: PublicKey;
  lpMintAddress: PublicKey;
  poolCoinTokenAccount: PublicKey;
  poolPcTokenAccount: PublicKey;
  poolWithdrawQueue: PublicKey;
  poolLpTokenAccount: PublicKey;
  poolTempLpTokenAccount: PublicKey;

  serumProgramId: PublicKey;
  serumMarket: PublicKey;
  serumCoinVaultAccount: PublicKey;
  serumPcVaultAccount: PublicKey;
  serumVaultSigner: PublicKey;

  nonce: number;
}

export const MARKET_PARAMS = {
  'SUSHI-USDT': {
    devnet: {
      ammId: new PublicKey('GU1zaGkqMvPb5HSZBiES2sEnQ6G1P3Zzk6KBtiDcJCRL'),
      ammAuthority: new PublicKey(
        'D9rfm5Wt22mfDUFM5f37wTy9jRnaUE2JUQqUu2yu1tcH',
      ),
      ammOpenOrders: new PublicKey(
        'J9X5Ua73qbU4MhABkCw6StXZB1j7TuKM1zjmkzTQJUwM',
      ),
      ammTargetOrders: new PublicKey(
        '2ama3ep6SpHcEqJPuX5pCwQ4jdWMUKAMx64AZurrZkQ1',
      ),
      ammQuantities: new PublicKey(
        'G3NP75v7e7LoTwTosB8Xp4WmZoQ62EZwxQ4KVzT4QWZf',
      ),
      coinMintAddress: new PublicKey(
        'HxPJD6nnKkNVbg8WiEPvz8DotbhdcyG8oGiiGrX9wAgU',
      ),
      pcMintAddress: new PublicKey(
        'FvBG4eePCHCdhx9KtG61tf4NCQAYp97ars3Q29AJWUZL',
      ),
      lpMintAddress: new PublicKey(
        'BRNKindjL5w8d9vkueMvzbWGHVahq4LXZPAB7SMmb5f',
      ),
      poolCoinTokenAccount: new PublicKey(
        'EayRU2xBEbT61o9DFoiZQFEGMHYe8RLAFHofxBJcLjGc',
      ),
      poolPcTokenAccount: new PublicKey(
        'C5e1gTKJKTowfhrChe9XC25bfCftqjUsP4g4JKc29c1S',
      ),
      poolWithdrawQueue: new PublicKey(
        'BJSqTNS28syFkWarVi5S42cuHuUnJu79QEF1wjBGcwU2',
      ),
      poolLpTokenAccount: new PublicKey(
        '2fck1sYb8CKGjaZJqJoAyEw9FoHsXfTMUyV4jM4vCWjr',
      ),
      poolTempLpTokenAccount: new PublicKey(
        '9rdV89EMbtXvLeYy6BvoKHXVucNueqbudmss4irm9A4B',
      ),

      // serum
      serumProgramId: new PublicKey(
        '9MVDeYQnJmN2Dt7H44Z8cob4bET2ysdNu2uFJcatDJno',
      ),
      serumMarket: new PublicKey('9DicndwhboYhLZDJqcBRQJiKfHrsfTmWcACxzqzCzkY'),
      serumCoinVaultAccount: new PublicKey(
        'HX6GyHAcSueoXBgHAXyRcBJQP66ptECRYwXhhszQfsXs',
      ),
      serumPcVaultAccount: new PublicKey(
        '4jJuHtNGH46hKwQsiJyffJHEmr9g4M3n5HYoenvoZLNi',
      ),
      serumVaultSigner: new PublicKey(
        '8eMZxmz2YaGEV9qTwiQYzUj3tH1wSGdAMMjkYN3SFM1x',
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
