/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  deserializeBuddy,
  deserializeBuddyReaction,
  parseBuddySentiment,
} from './buddy.ts';

test('a missing, blank or unknown comment shows no bubble', () => {
  assert.equal(deserializeBuddy(null, 'ROAST'), null);
  assert.equal(deserializeBuddy(undefined, 'ROAST'), null);
  assert.equal(deserializeBuddy('   ', 'PRAISE'), null);
  assert.equal(deserializeBuddy('Xịn đó', null), null);
  assert.equal(deserializeBuddy('Xịn đó', 'SHOUT'), null);
});

test('a comment is trimmed and gets the sentiment emoji and a spoken label', () => {
  const buddy = deserializeBuddy('  Lại trà sữa nữa hả bro? ', 'ROAST');
  assert.ok(buddy);
  assert.equal(buddy.text, 'Lại trà sữa nữa hả bro?');
  assert.equal(buddy.emoji, '💀');
  assert.equal(buddy.sentiment, 'ROAST');
  assert.match(buddy.label, /Bạn thân/);
});

test('each sentiment has its own emoji and its own look', () => {
  const looks = (['ROAST', 'PRAISE', 'NUDGE'] as const).map((sentiment) => {
    const buddy = deserializeBuddy('ok', sentiment);
    assert.ok(buddy);
    return `${buddy.emoji}|${buddy.containerClass}`;
  });
  assert.equal(new Set(looks).size, 3);
});

test('only the three known sentiments are accepted', () => {
  assert.equal(parseBuddySentiment('PRAISE'), 'PRAISE');
  assert.equal(parseBuddySentiment('praise'), null);
  assert.equal(parseBuddySentiment(42), null);
});

test('a finished job with a comment is a reaction to show', () => {
  const reaction = deserializeBuddyReaction({
    status: 'DONE',
    comment: 'Xịn đó bro 🔥',
    sentiment: 'PRAISE',
  });
  assert.equal(reaction.isPending, false);
  assert.equal(reaction.buddy?.text, 'Xịn đó bro 🔥');
});

test('a pending job keeps the watch going and shows nothing yet', () => {
  const reaction = deserializeBuddyReaction({
    status: 'PENDING',
    comment: null,
    sentiment: null,
  });
  assert.equal(reaction.isPending, true);
  assert.equal(reaction.buddy, null);
});

test('skipped, failed and unknown jobs end the watch with nothing to show', () => {
  for (const status of ['SKIPPED', 'FAILED', 'NONE'] as const) {
    const reaction = deserializeBuddyReaction({
      status,
      comment: null,
      sentiment: null,
    });
    assert.equal(reaction.isPending, false);
    assert.equal(reaction.buddy, null);
  }
});

test('a finished job whose comment was cleared by an edit shows nothing', () => {
  const reaction = deserializeBuddyReaction({
    status: 'DONE',
    comment: null,
    sentiment: null,
  });
  assert.equal(reaction.buddy, null);
});
