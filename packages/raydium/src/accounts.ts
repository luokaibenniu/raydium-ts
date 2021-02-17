import { Connection, PublicKey } from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from './ids';
import { TokenAccountInfo } from './types';

/**
 * Account

 * @param {Connection} connection
 * @param {any} wallet
 */
export class Account {
  private connection: Connection;
  private wallet: any;

  public tokenAccountInfo: TokenAccountInfo[];

  constructor(connection: Connection, wallet: any) {
    this.connection = connection;
    this.wallet = wallet;

    this.tokenAccountInfo = [];
  }

  async getTokenAccountInfo() {
    const infos = await this.connection.getParsedTokenAccountsByOwner(
      this.wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );

    const tokenAccountInfo: TokenAccountInfo[] = [];

    infos.value.map(info => {
      tokenAccountInfo.push({
        ...{
          mint: new PublicKey(info.account.data.parsed.info.mint),
          address: info.pubkey,
          owner: new PublicKey(info.account.data.parsed.info.owner),
        },
        ...info.account.data.parsed.info.tokenAmount,
      });
    });

    this.tokenAccountInfo = tokenAccountInfo;

    return tokenAccountInfo;
  }

  async getTokenAccountInfoByMint(
    mintAddress: string | PublicKey,
    useCache = true,
  ) {
    let mint = mintAddress;

    if (mint instanceof PublicKey) {
      mint = mint.toBase58();
    }

    let tokenAccountInfo: TokenAccountInfo[] = [];

    if (useCache && this.tokenAccountInfo.length > 0) {
      tokenAccountInfo = this.tokenAccountInfo;
    } else {
      tokenAccountInfo = await this.getTokenAccountInfo();
    }

    return tokenAccountInfo.find(
      tokenAccount => tokenAccount.mint.toBase58() === mint,
    );
  }
}
