/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { formatAmountInput, parseAmountInput } from './amountInput.ts';

test('parseAmountInput reads dotted and comma separated amounts', () => {
  assert.equal(parseAmountInput('1.250.000'), 1250000);
  assert.equal(parseAmountInput('1,250,000'), 1250000);
  assert.equal(parseAmountInput(' 55000 '), 55000);
});

test('parseAmountInput returns null when there are no digits', () => {
  assert.equal(parseAmountInput(''), null);
  assert.equal(parseAmountInput('abc'), null);
});

test('parseAmountInput keeps the sign and caps at 12 digits', () => {
  assert.equal(parseAmountInput('-5000'), -5000);
  assert.equal(parseAmountInput('−5.000'), -5000);
  assert.equal(parseAmountInput('1234567890123'), 123456789012);
});

test('formatAmountInput groups with commas', () => {
  assert.equal(formatAmountInput(1250000), '1,250,000');
  assert.equal(formatAmountInput(0), '0');
  assert.equal(formatAmountInput(-5000), '-5,000');
});
