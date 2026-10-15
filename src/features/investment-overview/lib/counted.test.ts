/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { findCountingUpdateDay } from './counted.ts';

const updates = [
  { createdAt: '2026-10-01T03:00:00.000Z', dateText: '01/10/2026' },
  { createdAt: '2026-09-01T03:00:00.000Z', dateText: '01/09/2026' },
  { createdAt: '2026-08-02T03:00:00.000Z', dateText: '02/08/2026' },
];

test('a transfer is counted by the first update entered after it', () => {
  assert.equal(
    findCountingUpdateDay('2026-09-28T10:00:00.000Z', updates),
    '01/10'
  );
  assert.equal(
    findCountingUpdateDay('2026-08-20T10:00:00.000Z', updates),
    '01/09'
  );
});

test('a transfer made after the latest update is still waiting', () => {
  assert.equal(
    findCountingUpdateDay('2026-10-12T10:00:00.000Z', updates),
    null
  );
});

test('without updates nothing counts the transfer', () => {
  assert.equal(findCountingUpdateDay('2026-10-12T10:00:00.000Z', []), null);
});
