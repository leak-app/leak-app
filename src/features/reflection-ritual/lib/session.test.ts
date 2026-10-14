/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { nextLabel, progressView } from './session.ts';

test('the second of four is lit up to the second segment', () => {
  assert.deepEqual(progressView(1, 4), {
    mode: 'segments',
    total: 4,
    filled: 2,
    percent: 50,
    label: 'Khoản 2 trên 4',
    counter: '2 / 4',
  });
});

test('a long queue becomes one bar', () => {
  assert.equal(progressView(0, 10).mode, 'segments');
  const view = progressView(4, 25);
  assert.equal(view.mode, 'bar');
  assert.equal(view.percent, 20);
});

test('progress never runs past the end', () => {
  assert.equal(progressView(7, 4).filled, 4);
  assert.equal(progressView(7, 4).counter, '4 / 4');
});

test('only the last item says "Hoàn tất"', () => {
  assert.equal(nextLabel(0, 3), 'Tiếp theo');
  assert.equal(nextLabel(1, 3), 'Tiếp theo');
  assert.equal(nextLabel(2, 3), 'Hoàn tất');
});
