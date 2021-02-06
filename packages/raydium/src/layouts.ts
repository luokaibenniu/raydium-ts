import { struct, u8, u16, nu64 } from 'buffer-layout';

export const MONITOR_STEP_LAYOUT = struct([
  u8('instruction'),
  u16('planOrderLimit'),
  u16('placeOrderLimit'),
  u16('cancelOrderLimit'),
]);

export const DEPOSIT_LAYOUT = struct([
  u8('instruction'),
  nu64('maxAmountA'),
  nu64('maxAmountB'),
  nu64('tolerate'),
]);

export const WITHDRAW_LAYOUT = struct([u8('instruction'), nu64('amount')]);

export const WITHDRAW_TRANSFER_LAYOUT = struct([
  u8('instruction'),
  u16('limit'),
]);
