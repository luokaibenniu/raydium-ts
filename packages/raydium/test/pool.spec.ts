import { getPoolByMintAddress } from '../src/pools';

describe('Get pool by mint addresses', () => {
  it('Works', async () => {
    const pool = getPoolByMintAddress(
      'CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
      'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4',
      'mainnet',
    );

    expect(pool).toHaveProperty('name');
    expect(pool?.name).toEqual('LINK-USDT');
  });

  it('Undefined', () => {
    const pool = getPoolByMintAddress('A', 'B', 'mainnet');

    expect(pool).toBeUndefined();
  });
});
