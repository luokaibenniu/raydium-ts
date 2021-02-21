import { FarmInfo } from '../types';
import { PublicKey } from '@solana/web3.js';

const farms: FarmInfo[] = [
  {
    name: 'LINK-USDT',
    lpMintAddress: new PublicKey(
      'EVDmwajM5U73PD34bYPugwiA4Eqqbrej4mLXXv15Z5qR',
    ),
    rewardMintAddress: new PublicKey(
      '8ed3VwZLFA8shoDhLU4QXY3jydKw7m5QrT8JLpjQnZcW',
    ),

    poolId: new PublicKey('2RnSyeMA9yFEecei7wzpFco8tqFwLqtWuhiP52V1DpaZ'),
    poolAuthority: new PublicKey(
      'Gd7YPXdnjLoqQGcTu9DHZE5zYNxauEZN7hib9w3SXrLm',
    ),
    poolLpTokenAccount: new PublicKey(
      '8upYQb9PVeRYUqYZyVPDMNo3ByJm5aoM94RRUbwX4cHZ', // lp vault
    ),
    poolRewardTokenAccount: new PublicKey(
      'NC59juF7jb9mqgSuXS4YMxRjpg8NQdtXEXqxNXfDmAM', // reward vault
    ),

    nonce: 254,
  },
  {
    name: 'RAY-USDT',
    lpMintAddress: new PublicKey(
      'CzPDyvotTcxNqtPne32yUiEVQ6jk42HZi1Y3hUu7qf7f',
    ),
    rewardMintAddress: new PublicKey(
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    ),

    poolId: new PublicKey('At7wjvmPipVEPZPtNLbwbnJ9gjSJa3Mp5rb3iQy159G3'),
    poolAuthority: new PublicKey(
      '7kmx3qY5STSzyf2SxxySsDC9RNwQUzrskhF1EyH6t7jM',
    ),
    poolLpTokenAccount: new PublicKey(
      '3pD6B3FZJKFjRsyYZVvSq5d5Tx7U9cFZWUpP1ZgdRrYZ', // lp vault
    ),
    poolRewardTokenAccount: new PublicKey(
      '3nbtcBYYuss3BVv31tDpGXcTWZLAvTSqjST7Ct6gS1xF', // reward vault
    ),

    nonce: 255,
  },
  {
    name: 'RAY-USDC',
    lpMintAddress: new PublicKey(
      'FgmBnsF5Qrnv8X9bomQfEtQTQjNNiBCWRKGpzPnE5BDg',
    ),
    rewardMintAddress: new PublicKey(
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    ),

    poolId: new PublicKey('3TDCZRY6sNNuEDceNZuns8HPVeAqW3PgwEcJnmWRjZio'),
    poolAuthority: new PublicKey(
      '8x5V7HpkRja7R5xWqZzCeBLKrxFyj5SVHfJo6uXN6xnx',
    ),
    poolLpTokenAccount: new PublicKey(
      '4vBhGaS17Ao7CFJGfXrTnWtKrrjBmji97VEBdw3vQUCX', // lp vault
    ),
    poolRewardTokenAccount: new PublicKey(
      'FWxqyEo1xkFxqKSePU4MdsK3wfizkbwQPX6y8UBvHwcR', // reward vault
    ),

    nonce: 255,
  },
  {
    name: 'RAY-SRM',
    lpMintAddress: new PublicKey(
      '5QXBMXuCL7zfAk39jEVVEvcrz1AvBGgT9wAhLLHLyyUJ',
    ),
    rewardMintAddress: new PublicKey(
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    ),

    poolId: new PublicKey('GCTbrnjVqKfD49EmmQ1dGncYh9hK6S8JFXHTqkSJ5KNu'),
    poolAuthority: new PublicKey(
      'Wg7ecCrXFprBQGouA9z4y9bsEq8LFbyp1qPncFy2XMS',
    ),
    poolLpTokenAccount: new PublicKey(
      'Gm5dN9TuGaTg7rgP9bAz9yUvVpnWW67Z2F5vjpC1yeUd', // lp vault
    ),
    poolRewardTokenAccount: new PublicKey(
      'HroE8cs9Vw96AQFYELz5yDxkWadMkcNJLo9ZBUrqKMxk', // reward vault
    ),

    nonce: 253,
  },
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
