import {
  Account,
  Liquidity,
  Staking,
  getTokenBySymbol,
} from '../../packages/raydium';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import React, { useEffect, useMemo, useState } from 'react';

import Wallet from '@project-serum/sol-wallet-adapter';

function App() {
  const [logs, setLogs] = useState([]);
  function addLog(log) {
    setLogs(logs => [...logs, log]);
  }

  // const network = clusterApiUrl('mainnet-beta');
  // const network = clusterApiUrl('devnet');
  const network = clusterApiUrl('testnet');
  // const network = 'http://127.0.0.1:8899';
  const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');

  const connection = useMemo(() => new Connection(network), [network]);
  const wallet = useMemo(() => new Wallet(providerUrl, network), [
    providerUrl,
    network,
  ]);

  const [, setConnected] = useState(false);

  const link = getTokenBySymbol('LINK');
  const usdt = getTokenBySymbol('USDT');
  const liquidity = new Liquidity(
    connection,
    wallet,
    link.mintAddress,
    usdt.mintAddress,
    'mainnet',
  );

  const staking = new Staking(
    connection,
    wallet,
    'FeFagq8SEK9W3Z2DJ7mNFiKMvEoTTS5STQFSVh1q98jA',
    'testnet',
  );

  const account = new Account(connection, wallet);

  useEffect(() => {
    wallet.on('connect', () => {
      setConnected(true);
      addLog('Connected to wallet ' + wallet.publicKey.toBase58());
    });
    wallet.on('disconnect', () => {
      setConnected(false);
      addLog('Disconnected from wallet');
    });
    return () => {
      wallet.disconnect();
    };
  }, [wallet]);

  // addLiquidity
  async function addLiquidity() {
    const coinTokenAccount = await account.getTokenAccountInfoByMint(
      link.mintAddress,
    );
    const pcTokenAccount = await account.getTokenAccountInfoByMint(
      usdt.mintAddress,
    );

    liquidity
      .addLiquidity(
        coinTokenAccount.address,
        pcTokenAccount.address,
        new PublicKey('ATVkbs8dhnFwAx5VVjYKUE78hpRFHuFPp7gtdz5XYmrY'),
        wallet.publicKey,
        0.1 * 10 ** link.decimals,
        1 * 10 ** usdt.decimals,
        // percent 50 / 1e4 = 0.005
        50,
      )
      .then(txid => {
        console.log(txid);
      })
      .catch(error => {
        console.log(error);
        console.log(error.err);
        console.log(error.txid);
      });
  }

  // removeLiquidity
  async function removeLiquidity() {
    const coinTokenAccount = await account.getTokenAccountInfoByMint(
      link.mintAddress,
    );
    const pcTokenAccount = await account.getTokenAccountInfoByMint(
      usdt.mintAddress,
    );

    liquidity
      .removeLiquidity(
        new PublicKey('ATVkbs8dhnFwAx5VVjYKUE78hpRFHuFPp7gtdz5XYmrY'),
        coinTokenAccount.address,
        pcTokenAccount.address,
        wallet.publicKey,
        1 * 1e6,
      )
      .then(txid => {
        console.log(txid);
      })
      .catch(error => {
        console.log(error);
        console.log(error.err);
        console.log(error.txid);
      });
  }

  // get current wallet's all token accounts (wrapped)
  async function getTokenAccountInfo() {
    account.getTokenAccountInfo().then(info => {
      console.log(info);
    });
  }

  async function getTokenAccountInfoByMint() {
    account.getTokenAccountInfoByMint(usdt.mintAddress).then(info => {
      console.log(info);
    });
  }

  async function getAmmInfo() {
    liquidity.getAmmInfo().then(info => {
      console.log(info);
    });
  }

  async function getPoolBalance() {
    liquidity.getPoolBalance().then(balances => {
      const { coin, pc } = balances;
      console.log(coin, pc);
    });
  }

  async function stakingDeposit() {
    staking
      .deposit(
        new PublicKey('9M4KCH4fFSrg4C6roBD7hfeQhm7kwKvkCBYQWFdZHSa4'),
        new PublicKey('8gQ3qMSQ6xCjoh2V1jcZ9BDVDWmHJ8sAL7EpGfYVNCaP'),
        1,
      )
      .then(info => {
        console.log(info);
      });
  }

  async function stakingWithdraw() {
    staking
      .withdraw(
        new PublicKey('9M4KCH4fFSrg4C6roBD7hfeQhm7kwKvkCBYQWFdZHSa4'),
        new PublicKey('8gQ3qMSQ6xCjoh2V1jcZ9BDVDWmHJ8sAL7EpGfYVNCaP'),
        1,
      )
      .then(info => {
        console.log(info);
      });
  }

  async function getUserInfoAccount() {
    staking.getUserInfoAccount().then(info => {
      console.log(info);
    });
  }

  return (
    <div className="App">
      <div>Network: {network}</div>
      <div>
        Waller provider:{' '}
        <input
          type="text"
          value={providerUrl}
          onChange={e => setProviderUrl(e.target.value.trim())}
        />
      </div>
      {wallet.connected ? (
        <>
          <div>Wallet address: {wallet.publicKey.toBase58()}</div>

          <button onClick={addLiquidity}>addLiquidity</button>
          <button onClick={removeLiquidity}>removeLiquidity</button>

          <button onClick={getTokenAccountInfo}>getTokenAccountInfo</button>
          <button onClick={getTokenAccountInfoByMint}>
            getTokenAccountInfoByMint
          </button>

          <button onClick={getAmmInfo}>getAmmInfo</button>
          <button onClick={getPoolBalance}>getPoolBalance</button>

          <hr />

          <button onClick={getUserInfoAccount}>getUserInfoAccount</button>
          <button onClick={stakingDeposit}>stakingDeposit</button>
          <button onClick={stakingWithdraw}>stakingWithdraw</button>
        </>
      ) : (
        <button onClick={() => wallet.connect()}>Connect to Wallet</button>
      )}
      <hr />
      <div className="logs">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
