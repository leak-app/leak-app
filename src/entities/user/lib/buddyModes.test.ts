/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { BUDDY_MODE_OPTIONS, describeBuddyMode } from './buddyModes.ts';

test('there is exactly one option per mode, Savage first (the default)', () => {
  assert.deepEqual(
    BUDDY_MODE_OPTIONS.map((option) => option.value),
    ['SAVAGE', 'GENTLE', 'MUTE']
  );
});

test('every option has a Vietnamese label and hint', () => {
  for (const option of BUDDY_MODE_OPTIONS) {
    assert.ok(option.label.length > 0);
    assert.ok(option.hint.length > 0);
  }
  assert.equal(
    new Set(BUDDY_MODE_OPTIONS.map((option) => option.label)).size,
    3
  );
});

test('describeBuddyMode finds the option for a mode', () => {
  assert.equal(describeBuddyMode('MUTE').label, 'Tắt');
  assert.equal(describeBuddyMode('GENTLE').value, 'GENTLE');
});
