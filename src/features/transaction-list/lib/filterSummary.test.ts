/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildFilterSummary,
  buildMonthOptions,
  countActiveFilters,
} from './filterSummary.ts';

test('month options start with "all time", then the latest months newest first', () => {
  const options = buildMonthOptions('2026-10', '2026-10', 3);
  assert.deepEqual(options, [
    { value: '', label: 'Tất cả' },
    { value: '2026-10', label: '10/2026' },
    { value: '2026-09', label: '09/2026' },
    { value: '2026-08', label: '08/2026' },
  ]);
});

test('a month outside the list (a deep link) is still offered so it shows as selected', () => {
  const options = buildMonthOptions('2025-01', '2026-10', 2);
  assert.deepEqual(
    options.map((o) => o.value),
    ['', '2026-10', '2026-09', '2025-01']
  );
});

test('the default view has no active filters', () => {
  assert.equal(
    countActiveFilters({
      month: '2026-10',
      currentMonth: '2026-10',
      categoryId: '',
      accountId: '',
    }),
    0
  );
});

test('every narrowed field counts once, and so does a month other than this one', () => {
  assert.equal(
    countActiveFilters({
      month: '',
      currentMonth: '2026-10',
      categoryId: 'c1',
      accountId: 'w1',
      outcome: 'LEAK',
    }),
    4
  );
});

test('the summary names the month first, then what narrows it', () => {
  assert.equal(
    buildFilterSummary({
      month: '2026-10',
      categoryLabel: '🍜 Ăn uống',
      outcomeLabel: 'Đáng giá',
    }),
    'Tháng 10/2026 · 🍜 Ăn uống · Đáng giá'
  );
  assert.equal(buildFilterSummary({ month: '' }), 'Mọi thời gian');
});
