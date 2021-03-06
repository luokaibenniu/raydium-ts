import {
  Account,
  Liquidity,
  Staking,
  Swap,
  TOKENS,
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

  const network = clusterApiUrl('mainnet-beta');
  // const network = clusterApiUrl('devnet');
  // const network = clusterApiUrl('testnet');
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

  let liquidity;
  Liquidity.load(
    connection,
    link.mintAddress,
    usdt.mintAddress,
    'mainnet',
  ).then(_liquidity => {
    liquidity = _liquidity;
    console.log(liquidity);
  });

  let staking;
  // Staking.load(
  //   connection,
  //   'FeFagq8SEK9W3Z2DJ7mNFiKMvEoTTS5STQFSVh1q98jA',
  //   'testnet',
  // ).then(_staking => {
  //   staking = _staking;
  //   console.log(_staking);
  // });

  const account = new Account(connection, wallet);

  let swap;
  Swap.load(
    connection,
    new PublicKey('95s818jz139xN4kqPhiQPF861Ui8wwEpVMogXcrYV8tK'),
    new PublicKey('BWaTu4seVkcaa2q6BsuBERFik4Y6Zpj1BppqaTxxC75j'),
    'mainnet',
  ).then(_swap => {
    console.log(_swap);
    swap = _swap;
  });

  let forecastResult;

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
        connection,
        wallet,
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
        connection,
        wallet,
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
    liquidity.getAmmInfo(connection).then(info => {
      console.log(info);
    });
  }

  async function getPoolBalance() {
    liquidity.getPoolBalance(connection).then(balances => {
      const { coin, pc } = balances;
      console.log(coin, pc);
    });
  }

  async function stakingDeposit() {
    staking
      .deposit(
        connection,
        wallet,
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
        connection,
        wallet,
        new PublicKey('9M4KCH4fFSrg4C6roBD7hfeQhm7kwKvkCBYQWFdZHSa4'),
        new PublicKey('8gQ3qMSQ6xCjoh2V1jcZ9BDVDWmHJ8sAL7EpGfYVNCaP'),
        1,
      )
      .then(info => {
        console.log(info);
      });
  }

  async function getUserInfoAccount() {
    staking.getUserInfoAccount(connection, wallet).then(info => {
      console.log(info);
    });
  }

  async function getUserInfo() {
    staking.getUserInfo(connection, wallet).then(info => {
      console.log(info);
    });
  }

  async function getStakeInfo() {
    staking.getStakeInfo(connection).then(info => {
      console.log(info);
    });
  }

  async function getPoolInfo() {
    staking.getPoolInfo(connection).then(info => {
      console.log(info);
    });
  }

  async function getPendingReward() {
    staking.getPendingReward(connection, wallet).then(info => {
      console.log(info);
    });
  }

  function printSwapMarket() {
    console.log(swap.market);
  }

  async function getAsks() {
    swap.getAsks(connection).then(info => {
      console.log(info);

      for (let order of info) {
        console.log(
          order.orderId,
          order.price,
          order.size,
          order.side, // 'buy' or 'sell'
        );
        console.log(order);
      }
    });
  }

  async function getBids() {
    swap.getBids(connection).then(info => {
      console.log(info);

      for (let order of info) {
        console.log(
          order.orderId,
          order.price,
          order.size,
          order.side, // 'buy' or 'sell'
        );
        console.log(order);
      }
    });
  }

  async function forecast() {
    // buy
    // swap
    //   .forecast(
    //     connection,
    //     new PublicKey('BWaTu4seVkcaa2q6BsuBERFik4Y6Zpj1BppqaTxxC75j'),
    //     new PublicKey('95s818jz139xN4kqPhiQPF861Ui8wwEpVMogXcrYV8tK'),
    //     100,
    //   )
    //   .then(info => {
    //     forecastResult = info;
    //     console.log(info);
    //   });
    // sell
    swap
      .forecast(
        connection,
        new PublicKey('95s818jz139xN4kqPhiQPF861Ui8wwEpVMogXcrYV8tK'),
        new PublicKey('BWaTu4seVkcaa2q6BsuBERFik4Y6Zpj1BppqaTxxC75j'),
        1,
      )
      .then(info => {
        forecastResult = info;
        console.log(info);
      });
  }

  async function doSwap() {
    // sell
    swap
      .swap(
        connection,
        wallet,
        new PublicKey('95s818jz139xN4kqPhiQPF861Ui8wwEpVMogXcrYV8tK'),
        new PublicKey('BWaTu4seVkcaa2q6BsuBERFik4Y6Zpj1BppqaTxxC75j'),
        new PublicKey('2hveenCMWYkR5zD7Mzxh2gSCwzfgo7GPWEmyF3FVmwwK'),
        new PublicKey('oTVQ6C9zJybQjEzJGutMiKs16SSg2Va1GZaSyqQCqWX'),
        forecastResult,
      )
      .then(info => {
        console.log(info);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function settle() {
    swap
      .settle(
        connection,
        wallet,
        new PublicKey('95s818jz139xN4kqPhiQPF861Ui8wwEpVMogXcrYV8tK'),
        new PublicKey('BWaTu4seVkcaa2q6BsuBERFik4Y6Zpj1BppqaTxxC75j'),
        new PublicKey('2hveenCMWYkR5zD7Mzxh2gSCwzfgo7GPWEmyF3FVmwwK'),
        new PublicKey('oTVQ6C9zJybQjEzJGutMiKs16SSg2Va1GZaSyqQCqWX'),
        forecastResult,
      )
      .then(info => {
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

          <h4>liquidity</h4>
          <button onClick={addLiquidity}>addLiquidity</button>
          <button onClick={removeLiquidity}>removeLiquidity</button>

          <button onClick={getTokenAccountInfo}>getTokenAccountInfo</button>
          <button onClick={getTokenAccountInfoByMint}>
            getTokenAccountInfoByMint
          </button>

          <button onClick={getAmmInfo}>getAmmInfo</button>
          <button onClick={getPoolBalance}>getPoolBalance</button>

          <h4>staking</h4>

          <button onClick={getUserInfoAccount}>getUserInfoAccount</button>
          <button onClick={getUserInfo}>getUserInfo</button>
          <button onClick={stakingDeposit}>stakingDeposit</button>
          <button onClick={stakingWithdraw}>stakingWithdraw</button>
          <button onClick={getStakeInfo}>getStakeInfo</button>
          <button onClick={getPoolInfo}>getPoolInfo</button>
          <button onClick={getPendingReward}>getPendingReward</button>

          <h4>swap</h4>

          <button onClick={printSwapMarket}>printSwapMarket</button>
          <button onClick={getAsks}>getAsks</button>
          <button onClick={getBids}>getBids</button>
          <button onClick={forecast}>forecast</button>
          <button onClick={doSwap}>doSwap</button>
          <button onClick={settle}>settle</button>
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
