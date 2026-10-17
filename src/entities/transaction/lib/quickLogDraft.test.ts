/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { describeUnresolved } from './quickLogDraft.ts';

test('a fully resolved draft has nothing to flag', () => {
  assert.equal(describeUnresolved({ unresolved: [] }), null);
});

test('names the single unresolved field in Vietnamese', () => {
  assert.equal(
    describeUnresolved({ unresolved: ['amount'] }),
    'Chưa xác định: số tiền'
  );
  assert.equal(
    describeUnresolved({ unresolved: ['category'] }),
    'Chưa xác định: danh mục'
  );
});

test('lists several unresolved fields in a fixed order', () => {
  assert.equal(
    describeUnresolved({ unresolved: ['category', 'amount'] }),
    'Chưa xác định: số tiền, danh mục'
  );
});
