/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  nextWatchDelay,
  useBuddyWatch,
  WATCH_DELAYS_MS,
} from './buddyWatch.ts';

test('the first check waits a few seconds, and the watch ends after the last delay', () => {
  assert.equal(nextWatchDelay(0), WATCH_DELAYS_MS[0]);
  assert.equal(
    nextWatchDelay(WATCH_DELAYS_MS.length - 1),
    WATCH_DELAYS_MS.at(-1)
  );
  assert.equal(nextWatchDelay(WATCH_DELAYS_MS.length), null);
  assert.equal(nextWatchDelay(-1), null);
});

test('the whole watch lasts under a minute', () => {
  const total = WATCH_DELAYS_MS.reduce((sum, delay) => sum + delay, 0);
  assert.ok(total <= 60_000);
});

test('saving a transaction starts watching it, and stopping clears it', () => {
  assert.equal(useBuddyWatch.getState().transactionId, null);
  useBuddyWatch.getState().startWatching('t1');
  assert.equal(useBuddyWatch.getState().transactionId, 't1');
  useBuddyWatch.getState().stopWatching();
  assert.equal(useBuddyWatch.getState().transactionId, null);
});

test('saving another transaction replaces the one being watched', () => {
  useBuddyWatch.getState().startWatching('t1');
  useBuddyWatch.getState().startWatching('t2');
  assert.equal(useBuddyWatch.getState().transactionId, 't2');
  useBuddyWatch.getState().stopWatching();
});
