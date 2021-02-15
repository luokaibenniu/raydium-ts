import React, { useEffect, useMemo, useState } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {
  MarketMaker,
  getTokenAccountInfoByOwner,
  getPairNameFromMintAddresses,
} from '../../packages/raydium';

function App() {
  const [logs, setLogs] = useState([]);
  function addLog(log) {
    setLogs(logs => [...logs, log]);
  }

  // const network = clusterApiUrl('mainnet-beta');
  const network = clusterApiUrl('devnet');
  // const network = 'http://127.0.0.1:8899';
  const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');

  const connection = useMemo(() => new Connection(network), [network]);
  const wallet = useMemo(() => new Wallet(providerUrl, network), [
    providerUrl,
    network,
  ]);

  const [, setConnected] = useState(false);

  const mm = new MarketMaker(connection, wallet, 'SUSHI-USDT', 'devnet');

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

  // deposit two tokens to pools
  async function deposit() {
    mm.deposit(
      new PublicKey('Ah2Z16vD6XsWohRF3cNckS9LNwtiWnKiRTywLPwgwP4z'),
      new PublicKey('5ifxt1WkmtNXx5eN95eVL96j6Utn99xc4itnRwejso1u'),
      new PublicKey('EiPuw5Q41mgB3eEHeaVszuh8rRFMMnzinBmMWFkakJgR'),
      wallet.publicKey,
      10 * 1e6,
      170 * 1e6,
      // percent 5000 / 10e6 = 0.0005
      50,
    )
      .then(txid => {
        console.log(txid);
      })
      .catch(error => {
        console.log(error.err);
        console.log(error.txid);
      });
  }

  // withdraw two tokens from market marker pool
  async function withdraw() {
    mm.withdraw(
      new PublicKey('9o1DwQ1SkDz7QxgsEonEpkpWMNKjS9H4hJ7W4m7Kyskt'),
      new PublicKey('8pHgCuTiFGdWXpTkJL38niEXAypMULfBuWuLntUN7NcZ'),
      new PublicKey('F7m458UPyb9KQmmRanvjpVLFTP5bnSLti1thMpKSMd1Z'),
      wallet.publicKey,
      1 * 1e6,
    )
      .then(txid => {
        console.log(txid);
      })
      .catch(error => {
        console.log(error.err);
        console.log(error.txid);
      });
  }

  // get this market maker state info
  async function getMarketMakerInfo() {
    mm.getMarketMakerInfo().then(info => {
      console.log(info);
    });
  }

  // get current wallet's all token accounts (wrapped)
  async function _getTokenAccountInfoByOwner() {
    getTokenAccountInfoByOwner(connection, wallet.publicKey).then(info => {
      console.log(info);
    });
  }

  async function getPoolBalance() {
    mm.getPoolBalance().then(balances => {
      const { coinBalance, pcBalance } = balances;
      console.log(coinBalance, pcBalance);
    });
  }

  function getPairByMint() {
    const name = getPairNameFromMintAddresses(
      'HxPJD6nnKkNVbg8WiEPvz8DotbhdcyG8oGiiGrX9wAgU',
      'FvBG4eePCHCdhx9KtG61tf4NCQAYp97ars3Q29AJWUZL',
      'devnet',
    );

    console.log(name);
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

          <button onClick={deposit}>deposit</button>
          <button onClick={withdraw}>withdraw</button>
          <button onClick={getMarketMakerInfo}>getMarketMakerInfo</button>
          <button onClick={_getTokenAccountInfoByOwner}>
            getTokenAccountInfoByOwner
          </button>
          <button onClick={getPoolBalance}>getPoolBalance</button>
          <button onClick={getPairByMint}>getPairByMint</button>
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
