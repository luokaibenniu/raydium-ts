import React, { useEffect, useMemo, useState } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { deposit } from '../../packages/raydium';

function App() {
  const [logs, setLogs] = useState([]);
  function addLog(log) {
    setLogs(logs => [...logs, log]);
  }

  // const network = clusterApiUrl('mainnet-beta');
  const network = 'http://127.0.0.1:8899';
  const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');

  const connection = useMemo(() => new Connection(network), [network]);
  const wallet = useMemo(() => new Wallet(providerUrl, network), [
    providerUrl,
    network,
  ]);

  const [, setConnected] = useState(false);

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

  async function testDeposit() {
    deposit(connection, wallet, {
      pairName: 'SUSHI-USDT',
      userTokenAccountA: new PublicKey(
        'GGTfg2voTdAJEtADP1uj5NgQdkzs16zyA7rLJESCrigv',
      ),
      userTokenAccountB: new PublicKey(
        'AxxgcthBrTNz73VEnEKwY1QcmnSEjH8rANaE1TJTj7c6',
      ),
      tokenAccountOwnerA: wallet.publicKey,
      tokenAccountOwnerB: wallet.publicKey,
      maxAmountA: 10,
      maxAmountB: 2,
      tolerate: 5000,
    })
      .then(txid => {
        console.log(txid);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <h1>Demo</h1>
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

          <button onClick={testDeposit}>Test Deposit</button>
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
