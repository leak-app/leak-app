/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { computeBalancePreview } from './preview.ts';

const first = {
  currentBalance: 50_000_000, // 45M opening + 5M deposited
  initialBalance: 45_000_000,
  lastBalance: null as number | null,
  asBaseline: false,
};

test('nothing to preview while the field is empty', () => {
  assert.equal(computeBalancePreview({ ...first, entered: null }), null);
});

test('splits profit from a deposit: gain 2M, return 4.0%', () => {
  assert.deepEqual(computeBalancePreview({ ...first, entered: 52_000_000 }), {
    netFlow: 5_000_000,
    adjustment: 2_000_000,
    gain: 2_000_000,
    returnPercent: 4,
    isBaseline: false,
  });
});

test('measures from the last update once there is one', () => {
  const preview = computeBalancePreview({
    currentBalance: 60_000_000,
    initialBalance: 45_000_000,
    lastBalance: 52_000_000,
    entered: 59_000_000,
    asBaseline: false,
  });
  assert.equal(preview?.netFlow, 8_000_000);
  assert.equal(preview?.gain, -1_000_000);
  // −1M ÷ (52M + 8M) = −1.7 %
  assert.equal(preview?.returnPercent, -1.7);
});

test('a baseline moves the balance but shows no profit or return', () => {
  const preview = computeBalancePreview({
    ...first,
    currentBalance: 45_000_000,
    entered: 70_000_000,
    asBaseline: true,
  });
  assert.equal(preview?.isBaseline, true);
  assert.equal(preview?.adjustment, 25_000_000);
  assert.equal(preview?.gain, 0);
  assert.equal(preview?.returnPercent, null);
});

test('the baseline flag is ignored after the first update', () => {
  const preview = computeBalancePreview({
    currentBalance: 52_000_000,
    initialBalance: 45_000_000,
    lastBalance: 52_000_000,
    entered: 53_000_000,
    asBaseline: true,
  });
  assert.equal(preview?.isBaseline, false);
  assert.equal(preview?.gain, 1_000_000);
});

test('an unchanged balance is a zero gain', () => {
  const preview = computeBalancePreview({ ...first, entered: 50_000_000 });
  assert.equal(preview?.gain, 0);
  assert.equal(preview?.adjustment, 0);
});

test('no return when there is nothing to divide by', () => {
  const preview = computeBalancePreview({
    currentBalance: 0,
    initialBalance: 0,
    lastBalance: null,
    entered: 1_000_000,
    asBaseline: false,
  });
  assert.equal(preview?.returnPercent, null);
});
