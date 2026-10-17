/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  QUICK_LOG_MAX_LENGTH,
  normalizeQuickLogText,
} from './quickLogInput.ts';

test('trims the phrase before it is sent', () => {
  assert.equal(normalizeQuickLogText('  55k phở bò  '), '55k phở bò');
});

test('blank input is never sent', () => {
  assert.equal(normalizeQuickLogText(''), null);
  assert.equal(normalizeQuickLogText('   \n '), null);
});

test('input over the server limit is never sent', () => {
  assert.equal(
    normalizeQuickLogText('x'.repeat(QUICK_LOG_MAX_LENGTH)),
    'x'.repeat(QUICK_LOG_MAX_LENGTH)
  );
  assert.equal(
    normalizeQuickLogText('x'.repeat(QUICK_LOG_MAX_LENGTH + 1)),
    null
  );
});
