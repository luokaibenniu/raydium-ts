import { PublicKey } from '@solana/web3.js';

const tokens = {
  SOL: {
    mintAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Solana',
    decimals: 9,
  },
  BTC: {
    mintAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'Wrapped Bitcoin',
    decimals: 6,
  },
  ETH: {
    mintAddress: new PublicKey('2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk'),
    name: 'Wrapped Ethereum',
    decimals: 6,
  },
  USDC: {
    mintAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USDC',
    decimals: 6,
  },
  YFI: {
    mintAddress: new PublicKey('3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB'),
    name: 'Wrapped YFI',
    decimals: 6,
  },
  LINK: {
    mintAddress: new PublicKey('CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG'),
    name: 'Wrapped Chainlink',
    decimals: 6,
  },
  XRP: {
    mintAddress: new PublicKey('Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8'),
    name: 'Wrapped XRP',
    decimals: 6,
  },
  USDT: {
    mintAddress: new PublicKey('BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4'),
    name: 'Wrapped USDT',
    decimals: 6,
  },
  SUSHI: {
    mintAddress: new PublicKey('AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy'),
    name: 'Wrapped SUSHI',
    decimals: 6,
  },
  ALEPH: {
    mintAddress: new PublicKey('CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K'),
    name: 'Wrapped ALEPH',
    decimals: 6,
  },
  SXP: {
    mintAddress: new PublicKey('SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX'),
    name: 'Wrapped SXP',
    decimals: 6,
  },
  HGET: {
    mintAddress: new PublicKey('BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN'),
    name: 'Wrapped HGET',
    decimals: 6,
  },
  CREAM: {
    mintAddress: new PublicKey('5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv'),
    name: 'Wrapped CREAM',
    decimals: 6,
  },
  UBXT: {
    mintAddress: new PublicKey('873KLxCbz7s9Kc4ZzgYRtNmhfkQrhfyWGZJBmyCbC3ei'),
    name: 'Wrapped UBXT',
    decimals: 6,
  },
  HNT: {
    mintAddress: new PublicKey('HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e'),
    name: 'Wrapped HNT',
    decimals: 6,
  },
  FRONT: {
    mintAddress: new PublicKey('9S4t2NEAiJVMvPdRYKVrfJpBafPBLtvbvyS3DecojQHw'),
    name: 'Wrapped FRONT',
    decimals: 6,
  },
  AKRO: {
    mintAddress: new PublicKey('6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF'),
    name: 'Wrapped AKRO',
    decimals: 6,
  },
  HXRO: {
    mintAddress: new PublicKey('DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc'),
    name: 'Wrapped HXRO',
    decimals: 6,
  },
  UNI: {
    mintAddress: new PublicKey('DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw'),
    name: 'Wrapped UNI',
    decimals: 6,
  },
  SRM: {
    mintAddress: new PublicKey('SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt'),
    name: 'Serum',
    decimals: 6,
  },
  FTT: {
    mintAddress: new PublicKey('AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3'),
    name: 'Wrapped FTT',
    decimals: 6,
  },
  MSRM: {
    mintAddress: new PublicKey('MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L'),
    name: 'MegaSerum',
    decimals: 0,
  },
  WUSDC: {
    mintAddress: new PublicKey('BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW'),
    name: 'Wrapped USDC',
    decimals: 6,
  },
  TOMO: {
    mintAddress: new PublicKey('GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd'),
    name: 'Wrapped TOMO',
    decimals: 6,
  },
  KARMA: {
    mintAddress: new PublicKey('EcqExpGNFBve2i1cMJUTR4bPXj4ZoqmDD2rTkeCcaTFX'),
    name: 'Wrapped KARMA',
    decimals: 4,
  },
  LUA: {
    mintAddress: new PublicKey('EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX'),
    name: 'Wrapped LUA',
    decimals: 6,
  },
  MATH: {
    mintAddress: new PublicKey('GeDS162t9yGJuLEHPWXXGrb1zwkzinCgRwnT8vHYjKza'),
    name: 'Wrapped MATH',
    decimals: 6,
  },
  KEEP: {
    mintAddress: new PublicKey('GUohe4DJUA5FKPWo3joiPgsB7yzer7LpDmt1Vhzy3Zht'),
    name: 'Wrapped KEEP',
    decimals: 6,
  },
  SWAG: {
    mintAddress: new PublicKey('9F9fNTT6qwjsu4X4yWYKZpsbw5qT7o6yR2i57JF2jagy'),
    name: 'Wrapped SWAG',
    decimals: 6,
  },
  FIDA: {
    mintAddress: new PublicKey('EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp'),
    name: 'Bonfida',
    decimals: 6,
  },
  KIN: {
    mintAddress: new PublicKey('kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6'),
    name: 'KIN',
    decimals: 5,
  },
  MAPS: {
    mintAddress: new PublicKey('MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb'),
    name: 'MAPS',
    decimals: 6,
  },
};

export default tokens;
