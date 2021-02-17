import { getTokenByMintAddress, getTokenBySymbol } from '../src/tokens';

describe('Get token by symbol', () => {
  it('Works', async () => {
    const token = getTokenBySymbol('SOL', 'mainnet');

    expect(token?.name).toEqual('Solana');
  });

  it('Undefined', () => {
    const token = getTokenBySymbol('ABCDEFG', 'mainnet');

    expect(token).toBeUndefined();
  });
});

describe('Get token by mint address', () => {
  it('Works', async () => {
    const token = getTokenByMintAddress(
      'So11111111111111111111111111111111111111112',
      'mainnet',
    );

    expect(token?.name).toEqual('Solana');
  });

  it('Undefined', () => {
    const token = getTokenByMintAddress(
      'So11111111111111111111111111111111111111111',
      'mainnet',
    );

    expect(token).toBeUndefined();
  });
});
