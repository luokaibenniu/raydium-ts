import {
  Account,
  AccountInfo,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';

export async function getFilteredProgramAccounts(
  connection: Connection,
  programId: PublicKey,
  filters,
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  // @ts-ignore
  const resp = await connection._rpcRequest('getProgramAccounts', [
    programId.toBase58(),
    {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    },
  ]);
  if (resp.error) {
    throw new Error(resp.error.message);
  }
  return resp.result.map(
    ({ pubkey, account: { data, executable, owner, lamports } }) => ({
      publicKey: new PublicKey(pubkey),
      accountInfo: {
        data: Buffer.from(data[0], 'base64'),
        executable,
        owner: new PublicKey(owner),
        lamports,
      },
    }),
  );
}

export async function sendTransaction(
  connection: Connection,
  wallet: any,
  instructions: TransactionInstruction[],
  signers: Account[],
  awaitConfirmation = true,
): Promise<string> {
  let transaction = new Transaction();

  instructions.forEach(instruction => transaction.add(instruction));

  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash;

  transaction.setSigners(
    // fee payied by the wallet owner
    wallet.publicKey,
    ...signers.map(s => s.publicKey),
  );

  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }

  transaction = await wallet.signTransaction(transaction);

  const rawTransaction = transaction.serialize();
  const options = {
    skipPreflight: true,
    commitment: 'singleGossip',
  };

  const txid = await connection.sendRawTransaction(rawTransaction, options);

  if (awaitConfirmation) {
    const status = (
      await connection.confirmTransaction(
        txid,
        options && (options.commitment as any),
      )
    ).value;

    if (status?.err) {
      throw { txid: txid, err: status.err };
    }
  }

  return txid;
}
