import { FarmInfo } from '../types';
import { PublicKey } from '@solana/web3.js';

const farms: FarmInfo[] = [
  {
    name: 'COIN-PC',
    lpMintAddress: new PublicKey(
      'FeFagq8SEK9W3Z2DJ7mNFiKMvEoTTS5STQFSVh1q98jA',
    ),
    rewardMintAddress: new PublicKey(
      '2jYtk2se64MALxEJPBBKXVfBjR1m9KMUAM1YFddfrdCy',
    ),

    poolId: new PublicKey('44g7LXnCbHe32mYaRbrSB9wPnBSbekHwsk9Ntw3gCLuf'),
    poolAuthority: new PublicKey(
      'ELYYEQLUeQZM7Eiba661chXx8XeDhUacSLDzWDGdPFtZ',
    ),
    poolLpTokenAccount: new PublicKey(
      'GdeGCv3NG8jhR3JP5t6bidTirX8XQs9qP1poRCzaxsmp',
    ),
    poolRewardTokenAccount: new PublicKey(
      'BzRSqsxaEWa8qvrvNF6rkL5pJtJBNcsB9tfhufsRbwyM',
    ),

    nonce: 255,
  },
];

export default farms;
