/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { formatLongDate, greetingForHour } from './datetime.ts';

test('greetingForHour follows the part of the day', () => {
  assert.equal(greetingForHour(5), 'Chào buổi sáng');
  assert.equal(greetingForHour(10), 'Chào buổi sáng');
  assert.equal(greetingForHour(11), 'Chào buổi trưa');
  assert.equal(greetingForHour(13), 'Chào buổi trưa');
  assert.equal(greetingForHour(14), 'Chào buổi chiều');
  assert.equal(greetingForHour(17), 'Chào buổi chiều');
  assert.equal(greetingForHour(18), 'Chào buổi tối');
  assert.equal(greetingForHour(23), 'Chào buổi tối');
});

test('greetingForHour treats the small hours as evening', () => {
  assert.equal(greetingForHour(0), 'Chào buổi tối');
  assert.equal(greetingForHour(4), 'Chào buổi tối');
});

test('formatLongDate writes the weekday, day and month in Vietnamese', () => {
  assert.equal(formatLongDate(new Date(2026, 9, 11)), 'Chủ nhật, 11 tháng 10');
  assert.equal(formatLongDate(new Date(2026, 0, 5)), 'Thứ hai, 5 tháng 1');
  assert.equal(formatLongDate(new Date(2026, 11, 31)), 'Thứ năm, 31 tháng 12');
});
