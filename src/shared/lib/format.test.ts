/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  formatCompactVnd,
  formatIncomeVnd,
  formatNumber,
  formatSignedPercent,
  formatSignedVnd,
  formatVnd,
  formatVndParts,
} from './format.ts';

test('formatNumber groups thousands with commas', () => {
  assert.equal(formatNumber(0), '0');
  assert.equal(formatNumber(999), '999');
  assert.equal(formatNumber(285000), '285,000');
  assert.equal(formatNumber(1234567), '1,234,567');
});

test('formatNumber rounds to whole dong', () => {
  assert.equal(formatNumber(1234.6), '1,235');
  assert.equal(formatNumber(1234.4), '1,234');
});

test('formatNumber never shows a negative zero or NaN', () => {
  assert.equal(formatNumber(-0.4), '0');
  assert.equal(formatNumber(Number.NaN), '0');
  assert.equal(formatNumber(Number.POSITIVE_INFINITY), '0');
});

test('formatNumber keeps the minus sign of negative amounts', () => {
  assert.equal(formatNumber(-1500), '-1,500');
});

test('formatVnd attaches the dong symbol without a space', () => {
  assert.equal(formatVnd(850000), '850,000₫');
  assert.equal(formatVnd(0), '0₫');
  assert.equal(formatVnd(-1500), '-1,500₫');
});

test('formatIncomeVnd puts a plus on money coming in', () => {
  assert.equal(formatIncomeVnd(600000), '+600,000₫');
  assert.equal(formatIncomeVnd(0), '0₫');
  assert.equal(formatIncomeVnd(-5), '-5₫');
});

test('formatVndParts splits the value from the symbol for the Amount component', () => {
  assert.deepEqual(formatVndParts(285000), { value: '285,000', symbol: '₫' });
  assert.deepEqual(formatVndParts(-1500), { value: '-1,500', symbol: '₫' });
});

test('formatCompactVnd uses tr and k with the symbol attached', () => {
  assert.equal(formatCompactVnd(1_250_000), '1.3tr₫');
  assert.equal(formatCompactVnd(1_000_000), '1tr₫');
  assert.equal(formatCompactVnd(850_000), '850k₫');
  assert.equal(formatCompactVnd(1_500), '2k₫');
  assert.equal(formatCompactVnd(900), '900₫');
});

test('formatCompactVnd shows 0 for amounts that are not finite', () => {
  assert.equal(formatCompactVnd(Number.POSITIVE_INFINITY), '0₫');
  assert.equal(formatCompactVnd(Number.NEGATIVE_INFINITY), '0₫');
  assert.equal(formatCompactVnd(Number.NaN), '0₫');
});

test('formatSignedVnd marks gains and losses and leaves zero bare', () => {
  assert.equal(formatSignedVnd(2000000), '+2,000,000₫');
  assert.equal(formatSignedVnd(-500000), '−500,000₫');
  assert.equal(formatSignedVnd(0), '0₫');
  assert.equal(formatSignedVnd(-0.2), '0₫');
});

test('formatSignedPercent keeps one decimal', () => {
  assert.equal(formatSignedPercent(4), '+4.0%');
  assert.equal(formatSignedPercent(-1.66), '−1.7%');
  assert.equal(formatSignedPercent(0), '0.0%');
  assert.equal(formatSignedPercent(Number.NaN), '0.0%');
});
