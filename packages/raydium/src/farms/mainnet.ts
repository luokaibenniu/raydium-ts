import { FarmInfo } from '../types';
import { PublicKey } from '@solana/web3.js';

const farms: FarmInfo[] = [
  {
    name: 'COIN-PC',
    lpMintAddress: new PublicKey(
      'HnkvybuszQLAfUbjzgvX6526qihfFDnjrB7FkDLQJ3Yt',
    ),
    rewardMintAddress: new PublicKey(
      'J7VsgcrWqr63SZLvSKf8oivWf1r129up6hjrjBJnor4z',
    ),

    poolId: new PublicKey('HSuYKUExxFMAESFam2ha1zFsofszCq5UeXnJfrKfvHU2'),
    poolAuthority: new PublicKey(
      '6PRkZ1cxEZWcDfQcMrceGomsG16KGPzD5TmsQc8oDmrc',
    ),
    poolLpTokenAccount: new PublicKey(
      '4ogDK8CNbEt2wcrgWBsHCXn9e6W2eGFeVitdYVDQqiiA',
    ),
    poolRewardTokenAccount: new PublicKey(
      'Bv5n1HrHpBBUerJ1vPCr928hQCzNMVxzHzEDaUPeTLeP',
    ),

    nonce: 255,
  },
];

export default farms;
