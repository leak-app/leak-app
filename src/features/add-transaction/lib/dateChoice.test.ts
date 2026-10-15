/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import dayjs from 'dayjs';

import { describeDateChoice } from './dateChoice.ts';

const now = dayjs('2026-10-14T15:30:00');

test('today and yesterday are quick choices without a date label', () => {
  assert.deepEqual(describeDateChoice('2026-10-14', now), {
    today: '2026-10-14',
    yesterday: '2026-10-13',
    isToday: true,
    isYesterday: false,
    customLabel: null,
  });
  const yesterday = describeDateChoice('2026-10-13', now);
  assert.equal(yesterday.isYesterday, true);
  assert.equal(yesterday.customLabel, null);
});

test('another day is shown as its date', () => {
  const choice = describeDateChoice('2026-10-02', now);
  assert.equal(choice.isToday, false);
  assert.equal(choice.isYesterday, false);
  assert.equal(choice.customLabel, '02/10/2026');
});

test('crossing a month boundary still finds yesterday', () => {
  const first = dayjs('2026-11-01T08:00:00');
  assert.equal(describeDateChoice('2026-10-31', first).isYesterday, true);
});
