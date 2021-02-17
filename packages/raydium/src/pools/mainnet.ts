import { PoolInfo } from '../types';
import { PublicKey } from '@solana/web3.js';
import { SERUM_PROGRAM_ID_V2 } from '../ids';
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

    serumProgramId: SERUM_PROGRAM_ID_V2.mainnet,
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
];

export default pools;
