import { PublicKey } from '@solana/web3.js';

// SPL TOKEN
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export const PROGRAM_IDS = {
  // mainnet: new PublicKey(''),
  devnet: new PublicKey('8fStnEY7aYiUQFRu8bG9s2YjRAxa5U8TAdgcotkLmAbx'),
};

interface MarketInfo {
  ammId: PublicKey;
  ammAuthority: PublicKey;

  ammOpenOrders: PublicKey;

  lpMintAddress: PublicKey;

  poolCoinTokenAccount: PublicKey;
  poolPcTokenAccount: PublicKey;

  serumProgramId: PublicKey;
  serumMarket: PublicKey;
  serumCoinVaultAccount: PublicKey;
  serumPcVaultAccount: PublicKey;
  serumVaultSigner: PublicKey;

  ammTargetOrders: PublicKey;
  ammQuantities: PublicKey;
  poolWithdrawQueue: PublicKey;
  poolTempLpTokenAccount: PublicKey;
  poolLpTokenAccount: PublicKey;

  nonce: number;
}

export const MARKET_PARAMS = {
  'SUSHI-USDT': {
    devnet: {
      ammId: new PublicKey('HwZr3BRkGGDqLDUzYUu869nr1tb33cNyZCE325PmnapD'),
      ammAuthority: new PublicKey(
        'D1akRVNqH5WfBCjGeZZM4ZaK4yZD8Zo8nFc8URRsvYnE',
      ),

      ammOpenOrders: new PublicKey(
        '51cfRdGn7iL5rGBfWMSXhgcW7P53nRM6jqfk8gSisN7x',
      ),

      lpMintAddress: new PublicKey(
        'BrSmMgxJMgUT9H2WxVUrp5rVum7V45tLemmccMYMGqhT',
      ),

      poolCoinTokenAccount: new PublicKey(
        'HzFGTSE9gkKELoRD14cDiosvkoojdDXJ6hEMJZUtG1h3',
      ),
      poolPcTokenAccount: new PublicKey(
        '39Tp9FQyjimXa9wqCC9nuCNefSfEbCWpJkovo5Pf5H9s',
      ),

      // serum
      serumProgramId: new PublicKey(
        '9MVDeYQnJmN2Dt7H44Z8cob4bET2ysdNu2uFJcatDJno',
      ),
      serumMarket: new PublicKey(
        '7UqmM6CNL65gaYg1RbZmJeqbqxQEmNWQzomGGpmRjjta',
      ),
      serumCoinVaultAccount: new PublicKey(
        '3pbRRjaD6vvr6WdcLpaD74PoDYJ6mugZ4ppVHVzoWBVL',
      ),
      serumPcVaultAccount: new PublicKey(
        'BGhg86aJVWP4ri3h7HuaW6p7vHXbMqjrhAgXC7iuezx9',
      ),
      serumVaultSigner: new PublicKey(
        'E3zLE5hyyNqB8Ar2VQYmUv5xfTY6F9WLBGAkbeoCwiHw',
      ),

      ammTargetOrders: new PublicKey(
        'BG94EMoNxGdT14e2FbJ1qv75JtTE9hxtdJ2YMFsF9D9k',
      ),
      ammQuantities: new PublicKey(
        '9noYYi3YfijeFUZCUVmAephgoQsrtqdU8UqtHHDRdkWS',
      ),
      poolWithdrawQueue: new PublicKey(
        'GmqwtoPaKkJRAkpNtiRdpovKmgYRhHexez1Tkfhudf3N',
      ),
      poolTempLpTokenAccount: new PublicKey(
        '6vtYyPA8dE2bFmxrMARbXd5HXm9v7EBZMfXhgZg2qb56',
      ),
      poolLpTokenAccount: new PublicKey(
        '5RCNyqFTKLpoQWtQQZPaY3DpfpEeXLym3PcGVszj9aRE',
      ),

      nonce: 254,
    },
  },
};

export function getProgramId(env = 'mainnet'): PublicKey {
  return PROGRAM_IDS[env];
}

export function getMarketParams(pair: string, env = 'mainnet'): MarketInfo {
  return MARKET_PARAMS[pair][env];
}
