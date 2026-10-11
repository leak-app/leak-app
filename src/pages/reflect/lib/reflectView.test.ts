/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { reflectView } from './reflectView.ts';

test('before the queue arrives: loading, or error if the first load failed', () => {
  assert.equal(
    reflectView({ hasSnapshot: false, count: 0, isError: false }),
    'loading'
  );
  assert.equal(
    reflectView({ hasSnapshot: false, count: 0, isError: true }),
    'error'
  );
});

test('an empty snapshot shows the empty state', () => {
  assert.equal(
    reflectView({ hasSnapshot: true, count: 0, isError: false }),
    'empty'
  );
});

test('a snapshot with items runs the session', () => {
  assert.equal(
    reflectView({ hasSnapshot: true, count: 3, isError: false }),
    'session'
  );
});

test('a failed background refetch never tears down a running session', () => {
  assert.equal(
    reflectView({ hasSnapshot: true, count: 3, isError: true }),
    'session'
  );
  assert.equal(
    reflectView({ hasSnapshot: true, count: 0, isError: true }),
    'empty'
  );
});
