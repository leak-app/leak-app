/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildMonthGrid,
  formatDayName,
  formatMonthTitle,
  shiftMonth,
} from './calendar.ts';

test('October 2026 starts on a Thursday and fills five Monday-first weeks', () => {
  const weeks = buildMonthGrid('2026-10');
  assert.equal(weeks.length, 5);
  assert.ok(weeks.every((week) => week.length === 7));
  // 1 October 2026 is a Thursday: three days of September come first.
  assert.deepEqual(
    weeks[0].map((d) => [d.date, d.inMonth]),
    [
      ['2026-09-28', false],
      ['2026-09-29', false],
      ['2026-09-30', false],
      ['2026-10-01', true],
      ['2026-10-02', true],
      ['2026-10-03', true],
      ['2026-10-04', true],
    ]
  );
  assert.equal(weeks[4][6].date, '2026-11-01');
  assert.equal(weeks[4][6].inMonth, false);
});

test('a month that starts on Monday has no leading days', () => {
  const weeks = buildMonthGrid('2026-06'); // 1 June 2026 is a Monday
  assert.equal(weeks[0][0].date, '2026-06-01');
  assert.equal(weeks[0][0].inMonth, true);
});

test('a month can need six weeks', () => {
  assert.equal(buildMonthGrid('2026-08').length, 6); // starts on a Saturday, 31 days
});

test('shiftMonth crosses the year', () => {
  assert.equal(shiftMonth('2026-12', 1), '2027-01');
  assert.equal(shiftMonth('2026-01', -1), '2025-12');
});

test('titles and spoken names are Vietnamese', () => {
  assert.equal(formatMonthTitle('2026-10'), 'Tháng 10, 2026');
  assert.equal(formatDayName('2026-10-14'), 'Thứ tư, 14 tháng 10, 2026');
  assert.equal(formatDayName('2026-10-11'), 'Chủ nhật, 11 tháng 10, 2026');
});
