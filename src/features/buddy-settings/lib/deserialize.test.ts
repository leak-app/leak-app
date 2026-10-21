/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { BUDDY_MODE_OPTIONS } from '../../../entities/user/lib/buddyModes.ts';
import { deserializeBuddySettings } from './deserialize.ts';

test('the select options are the three modes in order, and the hint follows the choice', () => {
  const settings = deserializeBuddySettings('GENTLE', BUDDY_MODE_OPTIONS);

  assert.deepEqual(
    settings.options.map((option) => option.value),
    ['SAVAGE', 'GENTLE', 'MUTE']
  );
  assert.equal(settings.value, 'GENTLE');
  assert.match(settings.hint, /nhắc nhẹ/);
});

test('with no saved preference yet it shows the default', () => {
  assert.equal(
    deserializeBuddySettings(undefined, BUDDY_MODE_OPTIONS).value,
    'SAVAGE'
  );
});
