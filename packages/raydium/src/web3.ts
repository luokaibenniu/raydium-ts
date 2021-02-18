import { Connection, PublicKey } from '@solana/web3.js';
import { blob, struct, u8 } from 'buffer-layout';

import { WRAPPED_SOL_MINT } from './ids';
import { throwIfNull } from './errors';

const MINT_LAYOUT = struct([blob(44), u8('decimals'), blob(37)]);

export async function getMintDecimals(
  connection: Connection,
  mint: PublicKey,
): Promise<number> {
  if (mint.equals(WRAPPED_SOL_MINT)) {
    return 9;
  }
  const { data } = throwIfNull(
    await connection.getAccountInfo(mint),
    'Mint address not found',
  );
  const { decimals } = MINT_LAYOUT.decode(data);
  return decimals;
}
