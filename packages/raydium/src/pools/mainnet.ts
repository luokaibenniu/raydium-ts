import { PoolInfo } from '../types';
import { PublicKey } from '@solana/web3.js';
import { SERUM_PROGRAM_IDS_V2 } from '../ids';
import Token from '../tokens/mainnet';

const pools: PoolInfo[] = [
  {
    name: 'LINK-USDT',
    coinMintAddress: Token.LINK.mintAddress,
    pcMintAddress: Token.USDT.mintAddress,
    lpMintAddress: new PublicKey(
      'EVDmwajM5U73PD34bYPugwiA4Eqqbrej4mLXXv15Z5qR',
    ),

    ammId: new PublicKey('Avkh3hMrjRRdGbm7EAmeXaJ1wWrbcwGWDGEroKq5wHJ8'),
    ammAuthority: new PublicKey('v1uTXS1hrW2DJkKPcQ3Dm7WwhYbGm7LhHoRE29QrHsJ'),
    ammOpenOrders: new PublicKey(
      'HD7VPeJL2Sgict6oBPhb2s3DXvS9uieQmuw7KzhrfD3j',
    ),
    ammTargetOrders: new PublicKey(
      'DQ7un7pYeWWcBrt1mpucasb2CaepJQJ3Z3axM3PJ4pJ4',
    ),
    ammQuantities: new PublicKey(
      '5KDL4Mtufuhe6Yof9nSPVjXgXgMFMHCXqKETzzbrsGzY',
    ),

    poolCoinTokenAccount: new PublicKey(
      '7r5YjMLMnmoYkD1bkyYq374yiTBG9XwBHMwi5ZVDptre',
    ),
    poolPcTokenAccount: new PublicKey(
      '6vMeQvJcC3VEGvtZ2TDXcShZerevxkqfW43yjX14vmSz',
    ),
    poolWithdrawQueue: new PublicKey(
      '3tgn1n9wMGfryZu37skcMhUuwbNYFWTT5hurWGijikXZ',
    ),
    poolTempLpTokenAccount: new PublicKey(
      'EL8G5U28xw9djiEb9AZiEtBUtUdA5YtvaAHJu5hxipCK',
    ),

    serumProgramId: SERUM_PROGRAM_IDS_V2.mainnet,
    serumMarket: new PublicKey('hBswhpNyz4m5nt4KwtCA7jYXvh7VmyZ4TuuPmpaKQb1'),
    serumCoinVaultAccount: new PublicKey(
      '8ZP84HpFb5k4paAgDGgXaMtne537LDFaxEWP89WKBPD1',
    ),
    serumPcVaultAccount: new PublicKey(
      'E3X7J1vyogGKZSySEo3WTS9GzipyTGVd5KKiXeFy1YHu',
    ),
    serumVaultSigner: new PublicKey(
      '7bwfaV98FDNtWvgPMo7wY3nE7cE8tKfXkFAVzCxtkw6w',
    ),

    nonce: 255,
  },
  {
    name: 'ETH-USDT',
    coinMintAddress: Token.ETH.mintAddress,
    pcMintAddress: Token.USDT.mintAddress,
    lpMintAddress: new PublicKey('KY4XvwHy7JPzbWYAbk23jQvEb4qWJ8aCqYWREmk1Q7K'),

    ammId: new PublicKey('7PGNXqdhrpQoVS5uQs9gjT1zfY6MUzEeYHopRnryj7rm'),
    ammAuthority: new PublicKey('BFCEvcoD1xY1HK4psbC5wYXVXEvmgwg4wKggk89u1NWw'),
    ammOpenOrders: new PublicKey(
      '3QaSNxMuA9zEXazLdD2oJq7jUCfShgtvdaepuq1uJFnS',
    ),
    ammTargetOrders: new PublicKey(
      '2exvd2T7yFYhBpi67XSrCVChVwMu23g653ELEnjvv8uu',
    ),
    ammQuantities: new PublicKey(
      'BtwQvRXNudUrazbJNhazajSZXEXbrf51ddBrmnje27Li',
    ),

    poolCoinTokenAccount: new PublicKey(
      'Gej1jXVRMdDKWSxmEZ78KJp5jruGJfR9dV3beedXe3BG',
    ),
    poolPcTokenAccount: new PublicKey(
      'FUDEbQKfMTfAaKS3dGdPEacfcC9bRpa5gmmDW8KNoUKp',
    ),
    poolWithdrawQueue: new PublicKey(
      '4q3qXQsQSvzNE1fSyEh249vHGttKfQPJWM7A3AtffEX5',
    ),
    poolTempLpTokenAccount: new PublicKey(
      '8i2cZ1UCAjVac6Z76GvQeRqZMKgMyuoZQeNSsjdtEgHG',
    ),

    serumProgramId: SERUM_PROGRAM_IDS_V2.mainnet,
    serumMarket: new PublicKey('5abZGhrELnUnfM9ZUnvK6XJPoBU5eShZwfFPkdhAC7o'),
    serumCoinVaultAccount: new PublicKey(
      'Gwna45N1JGLmUMGhFVP1ELz8szVSajp12RgPqCbk46n7',
    ),
    serumPcVaultAccount: new PublicKey(
      '8uqjWjNQiZvoieaGSoCRkGZExrqMpaYJL5huknCEHBcP',
    ),
    serumVaultSigner: new PublicKey(
      '4fgnxw343cfYgcNgWvan8H6j6pNBskBmGX4XMbhxtFbi',
    ),

    nonce: 255,
  },
  {
    name: 'RAY-USDC',
    coinMintAddress: Token.RAY.mintAddress,
    pcMintAddress: Token.USDC.mintAddress,
    lpMintAddress: new PublicKey(
      'FgmBnsF5Qrnv8X9bomQfEtQTQjNNiBCWRKGpzPnE5BDg',
    ),

    ammId: new PublicKey('G2PVNAKAp17xtruKiMwT1S2GWNxptWZfqK6oYrFWCXWX'),
    ammAuthority: new PublicKey('2XTg6m9wpuUyPNhHbi8DCGfyo58bpqmAmbujEEpUykSo'),
    ammOpenOrders: new PublicKey(
      'HuGmmcqH6ULntUdfaCVrx4uzuhHME55Dczt793EweoTZ',
    ),
    ammTargetOrders: new PublicKey(
      'B3UeQ7SK9U9a5vP8fDtZ5gfDv6KRFSsNtawpoH7fziNW',
    ),
    ammQuantities: new PublicKey(
      'LEgCPaQhYv9YSnKXvHtc6HixwxdXe9mmvLCuTTxW2Yn',
    ),

    poolCoinTokenAccount: new PublicKey(
      'CvcqJtGdS9C1jKKFzgCi5p8qsnR5BZCohWvYMBJXcnJ8',
    ),
    poolPcTokenAccount: new PublicKey(
      'AiYm8jzb2WB4HTTFTHX1XCS7uVSQM5XWnMsure5sMeQY',
    ),
    poolWithdrawQueue: new PublicKey(
      'rYqeTgbeQvrDxeCg4kjqHA1X6rfjjLQvQTJeYLAgXq7',
    ),
    poolTempLpTokenAccount: new PublicKey(
      '4om345FvSd9dqwFpy1SVmPFY9KzeUk8WmKiMzTbQxCQf',
    ),

    serumProgramId: SERUM_PROGRAM_IDS_V2.mainnet,
    serumMarket: new PublicKey('Bgz8EEMBjejAGSn6FdtKJkSGtvg4cuJUuRwaCBp28S3U'),
    serumCoinVaultAccount: new PublicKey(
      'BuMsEd7Ub6MtCCh1eT8pvL6zcBPbiifa1idVWa1BeE2R',
    ),
    serumPcVaultAccount: new PublicKey(
      'G7i7ZKx7rfMXGreLYzvR3ZZERgaGK7646nAgi8yjE8iN',
    ),
    serumVaultSigner: new PublicKey(
      'Aj6H2siiKsnAdAS5YVwuJPdXrHaLodsSyKs7ZiEtEZQN',
    ),

    nonce: 255,
  },
  {
    name: 'RAY-SRM',
    coinMintAddress: Token.RAY.mintAddress,
    pcMintAddress: Token.SRM.mintAddress,
    lpMintAddress: new PublicKey(
      '5QXBMXuCL7zfAk39jEVVEvcrz1AvBGgT9wAhLLHLyyUJ',
    ),

    ammId: new PublicKey('3Y5dpV9DtwkhewxXpiVRscFeQR2dvsHovXQonkKbuDwB'),
    ammAuthority: new PublicKey('7iND8ysb6fGUy8tx4C8AS51wbjvRjBxxSoaaL7t1yWXX'),
    ammOpenOrders: new PublicKey(
      '4QXs3bK3nyauMYutJjD8qGunFphAw944SsRdSD7n8oUj',
    ),
    ammTargetOrders: new PublicKey(
      '5oaHFj1aqz9xLxYwByddXiUfbSwRZ3gmSJsgBF4no7Xx',
    ),
    ammQuantities: new PublicKey(
      'His9VQDWu55QdDUFu7tp5CpiCB1fMs6EDk5oC4uTaS4G',
    ),

    poolCoinTokenAccount: new PublicKey(
      '5fHS778vozoDDYzzJz2xYG39whTzGGW6bF71GVxRyMXi',
    ),
    poolPcTokenAccount: new PublicKey(
      'CzVe191iLM2E31DBW7isXpZBPtcufRRsaxNRc8uShcEs',
    ),
    poolWithdrawQueue: new PublicKey(
      'BGmJSiCR7uuahrajWv1RgBJrbUjcQHREFfewqZPhf346',
    ),
    poolTempLpTokenAccount: new PublicKey(
      '5aMZAZdab2iS62rfqPYd15AkQ7Y5zSSfz7WxHjV9ZRPw',
    ),

    serumProgramId: SERUM_PROGRAM_IDS_V2.mainnet,
    serumMarket: new PublicKey('HSGuveQDXtvYR432xjpKPgHfzWQxnb3T8FNuAAvaBbsU'),
    serumCoinVaultAccount: new PublicKey(
      '6wXCSGvFvWLVoiRaXJheHoXec4LiJhiCWnxmQbYc9kv5',
    ),
    serumPcVaultAccount: new PublicKey(
      'G8KH5rE5EqeTpnLjTTNgKhVp47yRHCN28wH27vYFkWCR',
    ),
    serumVaultSigner: new PublicKey(
      'EXZnYg9QCzujDwm621N286d4KLAZiMwpUv64GdECcxbm',
    ),

    nonce: 255,
  },
  {
    name: 'RAY-USDT',
    coinMintAddress: Token.RAY.mintAddress,
    pcMintAddress: Token.USDT.mintAddress,
    lpMintAddress: new PublicKey(
      'CzPDyvotTcxNqtPne32yUiEVQ6jk42HZi1Y3hUu7qf7f',
    ),

    ammId: new PublicKey('4GygMmZgSoyfM3DEBpA8HvB8pooKWnTp232bKA17ptMG'),
    ammAuthority: new PublicKey('E8ddPSxjVUdW8wa5rs3gbscqoXQF1o7sJrkUMFU18zMS'),
    ammOpenOrders: new PublicKey(
      'Ht7CkowEPZ5yHQpQQhzhgnN8W7Dq3Gw96Z3Ph8f3tVpY',
    ),
    ammTargetOrders: new PublicKey(
      '3FGv6AuhfsxPBsPz4dXRA629W7UF2rW3NjHaihxUNcrB',
    ),
    ammQuantities: new PublicKey(
      'EwL1kwav5Z9dGrppUvusjPA4iJ4gVFsD3kGc5gCyAmMt',
    ),

    poolCoinTokenAccount: new PublicKey(
      'G2zmxUhRGn12fuePJy9QsmJKem6XCRnmAEkf8G6xcRTj',
    ),
    poolPcTokenAccount: new PublicKey(
      'H617sH2JNjMqPhRxsu43C8vDYfjZrFuoMEKdJyMu7V3t',
    ),
    poolWithdrawQueue: new PublicKey(
      '2QiXRE5yAfTbTUT9BCfmkahmPPhsmWRox1V88iaJppEX',
    ),
    poolTempLpTokenAccount: new PublicKey(
      '5ujWtJVhwzy8P3DJBYwLo4StxiFhJy5q6xHnMx7yrPPb',
    ),

    serumProgramId: SERUM_PROGRAM_IDS_V2.mainnet,
    serumMarket: new PublicKey('HZyhLoyAnfQ72irTdqPdWo2oFL9zzXaBmAqN72iF3sdX'),
    serumCoinVaultAccount: new PublicKey(
      '56KzKfd9LvsY4QuMZcGxcGCd78ZBFQ7JcyMFwgqpXH12',
    ),
    serumPcVaultAccount: new PublicKey(
      'GLntTfM7RHeg5RuAuXcudT4NV7d4BGPrEFq7mmMxn29E',
    ),
    serumVaultSigner: new PublicKey(
      '6FYUBnwRVxxYCv1kpad4FaFLJAzLYuevFWmpVp7hViTn',
    ),

    nonce: 255,
  },
  {
    name: 'COIN-PC',
    coinMintAddress: Token.COIN.mintAddress,
    pcMintAddress: Token.PC.mintAddress,
    lpMintAddress: new PublicKey(
      'HnkvybuszQLAfUbjzgvX6526qihfFDnjrB7FkDLQJ3Yt',
    ),

    ammId: new PublicKey('3WiRXru3pfXGgxgFabfPkR1GHr7xE9nQsKXXmHGWjWRx'),
    ammAuthority: new PublicKey('CWF53UTZEku9ayJHjJ5t48dmTWv3AM2S7A74J4ydp2NX'),
    ammOpenOrders: new PublicKey(
      'D1atZyofbzvvW41YQNg95NUcgu5bcsa5kJGDrhsKdoBU',
    ),
    ammTargetOrders: new PublicKey(
      '3JPTRxfdgBcDU6Jajkwq3C46fhsC8vG75HJxJEQ8f4YA',
    ),
    ammQuantities: new PublicKey(
      'B3F7QXT636yRm8EAJY3ehaMQpfK3qvEYRWUWJVTCFro8',
    ),

    poolCoinTokenAccount: new PublicKey(
      '8tA74jqYPNmr8pcvZE3FBxmLMDqFMvZryny8XojCD5CE',
    ),
    poolPcTokenAccount: new PublicKey(
      '7t51g6PFAfnBtWqooQhHErneVqQb4SN1QuPnG7iGa87M',
    ),
    poolWithdrawQueue: new PublicKey(
      '5xJvsxAAbtD97YrKvoB9A6APjEv8G2FsAKpY9yA9sCHp',
    ),
    poolTempLpTokenAccount: new PublicKey(
      '29remm8GE4TeYEkcoNtV4XjJVUAhPF2mMhZdkq45SyUo',
    ),

    serumProgramId: SERUM_PROGRAM_IDS_V2.mainnet,
    serumMarket: new PublicKey('24LU4oZEqeqC4mGJL3Kn98WSS4KTCth4WJBybs2uvivY'),
    serumCoinVaultAccount: new PublicKey(
      '6V8LMUTwXpv6yb99WFpYDApz5CBpzvvkANQs5QVbYF3E',
    ),
    serumPcVaultAccount: new PublicKey(
      '4EyWqx669YnoDhcZQq8B2HvZB9uxiaqpFeaGeKVSs2wr',
    ),
    serumVaultSigner: new PublicKey(
      'AFxuL9rUVSBRAUGuKs6S42VWri6PouYcYZJa6N3h28SU',
    ),

    nonce: 255,
  },
];

export default pools;
