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
];

export default pools;
