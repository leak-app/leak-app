/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  amountFromText,
  buildUpdatePatch,
  initialEditState,
  isEditValid,
  withType,
} from './editDraft.ts';

const stored = {
  type: 'EXPENSE' as const,
  amount: 55000,
  categoryId: 'food',
  accountId: 'cash',
  note: 'phở bò',
  occurredOn: '2026-10-12',
};
const initial = initialEditState(stored);

test('starts from the transaction as stored', () => {
  assert.deepEqual(initial, {
    type: 'EXPENSE',
    amount: '55000',
    categoryId: 'food',
    accountId: 'cash',
    note: 'phở bò',
    occurredOn: '2026-10-12',
  });
});

test('a stored cent amount becomes whole dong and is not treated as an edit', () => {
  const odd = initialEditState({ ...stored, amount: 12.5 });
  assert.equal(odd.amount, '13');
  assert.equal(buildUpdatePatch(odd, { ...odd }), null);
});

test('no change gives no patch', () => {
  assert.equal(buildUpdatePatch(initial, { ...initial }), null);
});

test('only the changed fields are sent', () => {
  assert.deepEqual(buildUpdatePatch(initial, { ...initial, amount: '60000' }), {
    amount: 60000,
  });
  assert.deepEqual(
    buildUpdatePatch(initial, { ...initial, occurredOn: '2026-10-10' }),
    { occurredOn: '2026-10-10' }
  );
  assert.deepEqual(
    buildUpdatePatch(initial, { ...initial, accountId: 'bank' }),
    { accountId: 'bank' }
  );
});

test('a changed type always travels with its category', () => {
  const income = {
    ...withType(initial, initial, 'INCOME'),
    categoryId: 'salary',
  };
  assert.deepEqual(buildUpdatePatch(initial, income), {
    type: 'INCOME',
    categoryId: 'salary',
  });
});

test('switching the type clears the category, switching back restores it', () => {
  const income = withType(initial, initial, 'INCOME');
  assert.equal(income.categoryId, '');
  const back = withType(income, initial, 'EXPENSE');
  assert.equal(back.categoryId, 'food');
  assert.equal(buildUpdatePatch(initial, back), null);
});

test('a blank note is sent as blank so the server clears it', () => {
  assert.deepEqual(buildUpdatePatch(initial, { ...initial, note: '   ' }), {
    description: '',
  });
});

test('trailing spaces in the note are not an edit', () => {
  assert.equal(
    buildUpdatePatch(initial, { ...initial, note: 'phở bò  ' }),
    null
  );
});

test('an empty stored note stays unchanged when left empty', () => {
  const none = initialEditState({ ...stored, note: '' });
  assert.equal(buildUpdatePatch(none, { ...none }), null);
});

test('valid needs an amount above zero and a category', () => {
  assert.equal(isEditValid(initial), true);
  assert.equal(isEditValid({ ...initial, amount: '0' }), false);
  assert.equal(isEditValid({ ...initial, categoryId: '' }), false);
});

test('amount text keeps digits only, strips leading zeros and caps the length', () => {
  assert.equal(amountFromText('1.250.000 ₫'), '1250000');
  assert.equal(amountFromText('007'), '7');
  assert.equal(amountFromText(''), '0');
  assert.equal(amountFromText('abc'), '0');
  assert.equal(amountFromText('1'.repeat(20)), '1'.repeat(12));
});
