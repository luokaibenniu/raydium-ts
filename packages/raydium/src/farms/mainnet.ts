import { FarmInfo } from '../types';
import { PublicKey } from '@solana/web3.js';

const farms: FarmInfo[] = [
  {
    name: 'COIN-PC',
    lpMintAddress: new PublicKey(
      'HnkvybuszQLAfUbjzgvX6526qihfFDnjrB7FkDLQJ3Yt',
    ),
    rewardMintAddress: new PublicKey(
      '8ed3VwZLFA8shoDhLU4QXY3jydKw7m5QrT8JLpjQnZcW',
    ),

    poolId: new PublicKey('FZRkfi9bpjAcjukmgCNa3tVpZ98m7yFr8F8R6TWaexcs'),
    poolAuthority: new PublicKey(
      '53pAumqGhESMKACT7A6gdUDguPoLTBtUyXpdCdSFepZz',
    ),
    poolLpTokenAccount: new PublicKey(
      'Dp3bocwwbyY5TpcnKz3Y8VhknDVagfKdFyGyzhf5bkRF',
    ),
    poolRewardTokenAccount: new PublicKey(
      'EbNNUoNQXzuzvEt4kqZGuVm19pxPKtb1AFu4UZYyr89e',
    ),

    nonce: 255,
  },
];

export default farms;
