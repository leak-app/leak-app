/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { initialFormState } from './draftState.ts';

test('a resolved draft pre-fills every field', () => {
  const state = initialFormState({
    amount: 55000,
    type: 'EXPENSE',
    categoryId: 'c1',
    accountId: 'w1',
    description: 'phở bò',
    unresolved: [],
  });
  assert.deepEqual(state, {
    type: 'EXPENSE',
    amount: '55000',
    description: 'phở bò',
    categoryId: 'c1',
    walletId: 'w1',
    categoryUnresolved: false,
  });
});

test('an unresolved category is flagged, not defaulted', () => {
  const state = initialFormState({
    amount: 55000,
    type: 'EXPENSE',
    categoryId: null,
    accountId: null,
    description: 'x',
    unresolved: ['category'],
  });
  assert.equal(state.categoryId, '');
  assert.equal(state.categoryUnresolved, true);
  assert.equal(state.walletId, null);
});

test('an unresolved amount starts the numpad at zero', () => {
  const state = initialFormState({
    amount: null,
    type: 'INCOME',
    categoryId: 'c9',
    accountId: null,
    description: 'lương',
    unresolved: ['amount'],
  });
  assert.equal(state.amount, '0');
  assert.equal(state.type, 'INCOME');
});

test("no draft keeps today's empty defaults", () => {
  assert.deepEqual(initialFormState(undefined), {
    type: 'EXPENSE',
    amount: '0',
    description: '',
    categoryId: '',
    walletId: null,
    categoryUnresolved: false,
  });
});
