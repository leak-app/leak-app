/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  addToAmount,
  pickTransferDefaults,
  validateTransfer,
  type TransferWalletModel,
} from './transfer.ts';

const wallets: TransferWalletModel[] = [
  { id: 'fund', type: 'INVESTMENT', createdAt: '2026-01-02' },
  { id: 'cash', type: 'LIQUID', createdAt: '2026-01-01' },
  { id: 'bank', type: 'LIQUID', createdAt: '2026-01-03' },
];

test('with no preset: oldest cash wallet into the oldest investment wallet', () => {
  assert.deepEqual(pickTransferDefaults(wallets, {}), {
    fromId: 'cash',
    toId: 'fund',
  });
});

test('a preset destination is paid from the oldest cash wallet', () => {
  assert.deepEqual(pickTransferDefaults(wallets, { toId: 'fund' }), {
    fromId: 'cash',
    toId: 'fund',
  });
});

test('a preset destination that is itself cash is not paid from itself', () => {
  assert.deepEqual(pickTransferDefaults(wallets, { toId: 'cash' }), {
    fromId: 'bank',
    toId: 'cash',
  });
});

test('a preset source goes to the oldest investment wallet', () => {
  assert.deepEqual(pickTransferDefaults(wallets, { fromId: 'bank' }), {
    fromId: 'bank',
    toId: 'fund',
  });
});

test('a preset investment source falls back to any other wallet', () => {
  assert.deepEqual(pickTransferDefaults(wallets, { fromId: 'fund' }), {
    fromId: 'fund',
    toId: 'cash',
  });
});

test('two presets are kept as they are', () => {
  assert.deepEqual(
    pickTransferDefaults(wallets, { fromId: 'bank', toId: 'cash' }),
    { fromId: 'bank', toId: 'cash' }
  );
});

test('a single wallet leaves the destination empty', () => {
  assert.deepEqual(pickTransferDefaults([wallets[1]], {}), {
    fromId: 'cash',
    toId: '',
  });
  assert.deepEqual(pickTransferDefaults([], {}), { fromId: '', toId: '' });
});

test('validateTransfer reports the first problem', () => {
  const ok = { fromId: 'cash', toId: 'fund', amount: 1 };
  assert.equal(validateTransfer(ok), null);
  assert.equal(validateTransfer({ ...ok, fromId: '' }), 'Hãy chọn ví nguồn');
  assert.equal(validateTransfer({ ...ok, toId: '' }), 'Hãy chọn ví nhận');
  assert.equal(
    validateTransfer({ ...ok, toId: 'cash' }),
    'Ví nguồn và ví nhận phải khác nhau'
  );
  assert.equal(
    validateTransfer({ ...ok, amount: null }),
    'Nhập số tiền lớn hơn 0'
  );
  assert.equal(
    validateTransfer({ ...ok, amount: 0 }),
    'Nhập số tiền lớn hơn 0'
  );
});

test('a quick chip adds to the amount and stops at the largest amount', () => {
  assert.equal(addToAmount(null, 2_000_000), 2_000_000);
  assert.equal(addToAmount(2_000_000, 2_000_000), 4_000_000);
  assert.equal(addToAmount(999_999_000_000, 5_000_000), 999_999_999_999);
});
