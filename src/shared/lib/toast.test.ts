/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { toastReducer } from './toast.ts';

test('show puts the message on screen', () => {
  assert.deepEqual(
    toastReducer(null, { type: 'show', id: 1, message: 'Xong' }),
    {
      id: 1,
      message: 'Xong',
    }
  );
});

test('a newer toast replaces the current one', () => {
  const first = toastReducer(null, { type: 'show', id: 1, message: 'A' });
  assert.deepEqual(toastReducer(first, { type: 'show', id: 2, message: 'B' }), {
    id: 2,
    message: 'B',
  });
});

test('dismiss clears the toast it was started for', () => {
  const state = toastReducer(null, { type: 'show', id: 1, message: 'A' });
  assert.equal(toastReducer(state, { type: 'dismiss', id: 1 }), null);
});

test('a late timer of an older toast does not clear the newer one', () => {
  let state = toastReducer(null, { type: 'show', id: 1, message: 'A' });
  state = toastReducer(state, { type: 'show', id: 2, message: 'B' });
  assert.deepEqual(toastReducer(state, { type: 'dismiss', id: 1 }), {
    id: 2,
    message: 'B',
  });
});

test('dismiss with nothing on screen stays empty', () => {
  assert.equal(toastReducer(null, { type: 'dismiss', id: 5 }), null);
});
