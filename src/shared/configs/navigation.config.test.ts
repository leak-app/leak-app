/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { NAV_ITEMS } from './navigation.config.ts';

const activeLabels = (pathname: string) =>
  NAV_ITEMS.filter((item) => item.isActive(pathname)).map((item) => item.label);

test('the bar has five slots with the add button in the middle', () => {
  assert.deepEqual(
    NAV_ITEMS.map((item) => item.label),
    ['Hôm nay', 'Nhìn lại', 'Ghi khoản chi', 'Rò rỉ', 'Mục tiêu']
  );
  assert.equal(NAV_ITEMS[2]?.isAction, true);
  assert.equal(NAV_ITEMS.filter((item) => item.isAction).length, 1);
});

test('each main route lights exactly its own slot', () => {
  assert.deepEqual(activeLabels('/overview'), ['Hôm nay']);
  assert.deepEqual(activeLabels('/reflect'), ['Nhìn lại']);
  assert.deepEqual(activeLabels('/transactions/new'), ['Ghi khoản chi']);
  assert.deepEqual(activeLabels('/log'), ['Ghi khoản chi']);
  assert.deepEqual(activeLabels('/leaks'), ['Rò rỉ']);
  assert.deepEqual(activeLabels('/goals'), ['Mục tiêu']);
});

test('sub-pages keep their slot lit', () => {
  assert.deepEqual(activeLabels('/goals/123'), ['Mục tiêu']);
  assert.deepEqual(activeLabels('/leaks/details'), ['Rò rỉ']);
});

test('routes without a slot light nothing', () => {
  for (const path of [
    '/transactions',
    '/budgets',
    '/wallets',
    '/categories',
    '/profile',
    '/profile/security',
    '/',
  ]) {
    assert.deepEqual(activeLabels(path), [], path);
  }
});

test('every slot points at a route the app has', () => {
  assert.deepEqual(
    NAV_ITEMS.map((item) => item.to),
    ['/overview', '/reflect', '/transactions/new', '/leaks', '/goals']
  );
});
