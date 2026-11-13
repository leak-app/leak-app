/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  barGeometry,
  isSpendingFast,
  monthProgress,
  perDayAmount,
  rowState,
  usedPercent,
} from './budgetStatus.ts';

test('a row is ok below 80%, near from 80% to just under the limit', () => {
  assert.equal(rowState(450_000, 1_000_000), 'ok');
  assert.equal(rowState(794_000, 1_000_000), 'ok');
  assert.equal(rowState(800_000, 1_000_000), 'near');
  assert.equal(rowState(999_000, 1_000_000), 'near');
});

test('a row that displays as 80% is near, like the backend warning flag', () => {
  assert.equal(usedPercent(795_000, 1_000_000), 80);
  assert.equal(rowState(795_000, 1_000_000), 'near');
});

test('a row at exactly the limit is full, above it is over', () => {
  assert.equal(rowState(1_000_000, 1_000_000), 'full');
  assert.equal(rowState(1_000_001, 1_000_000), 'over');
});

test('99.6% of the limit is near, not full, even though it rounds to 100%', () => {
  assert.equal(usedPercent(996_000, 1_000_000), 100);
  assert.equal(rowState(996_000, 1_000_000), 'near');
});

test('within the limit the bar is the used share and has no stripes', () => {
  assert.deepEqual(barGeometry(450_000, 1_000_000), {
    fillPercent: 45,
    overflowStartPercent: null,
  });
  assert.deepEqual(barGeometry(1_000_000, 1_000_000), {
    fillPercent: 100,
    overflowStartPercent: null,
  });
});

test('over the limit the solid part shrinks and the stripes start at the limit', () => {
  const bar = barGeometry(1_250_000, 1_000_000);
  assert.equal(bar.fillPercent, 80);
  assert.equal(bar.overflowStartPercent, 80);
});

test('a zero limit draws an empty bar instead of dividing by zero', () => {
  assert.deepEqual(barGeometry(50_000, 0), {
    fillPercent: 0,
    overflowStartPercent: null,
  });
  assert.equal(usedPercent(50_000, 0), 0);
});

test('the 13th of a 30-day month is 43% in with 17 days left', () => {
  assert.deepEqual(monthProgress(13, 30), { todayPercent: 43, daysLeft: 17 });
});

test('on the last day nothing is left of the month', () => {
  assert.equal(monthProgress(30, 30).daysLeft, 0);
  assert.equal(monthProgress(30, 30).todayPercent, 100);
});

test('spending is fast only when more than 5 points ahead of the month', () => {
  assert.equal(isSpendingFast(48, 43), false);
  assert.equal(isSpendingFast(49, 43), true);
  assert.equal(isSpendingFast(20, 43), false);
});

test('per-day budget rounds to thousands, or to whole dong when small', () => {
  assert.equal(perDayAmount(3_620_000, 17), 213_000);
  assert.equal(perDayAmount(4_000, 17), 235);
  assert.equal(perDayAmount(0, 17), 0);
  assert.equal(perDayAmount(-50_000, 17), 0);
  assert.equal(perDayAmount(500_000, 0), 0);
});
