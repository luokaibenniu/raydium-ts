import { Connection, PublicKey } from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from './ids';

export async function getTokenAccountInfoByOwner(
  connection: Connection,
  ownerAddress: PublicKey,
) {
  return connection.getParsedTokenAccountsByOwner(ownerAddress, {
    programId: TOKEN_PROGRAM_ID,
  });
}
