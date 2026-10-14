/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { RawGoogleSheetsStatusModel } from '../model/types.ts';
import {
  deserializeSheetsStatus,
  formatRunHeadline,
  formatRunTime,
  parseSheetsReturn,
} from './deserialize.ts';

const base: RawGoogleSheetsStatusModel = {
  available: true,
  connected: false,
  syncEnabled: false,
  needsReconnect: false,
  googleEmail: null,
  spreadsheetUrl: null,
  lastRun: null,
};

const connected: RawGoogleSheetsStatusModel = {
  ...base,
  connected: true,
  syncEnabled: true,
  googleEmail: 'user@gmail.com',
  spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/x/edit',
};

// Built from local time so the assertions hold in any timezone.
const localDate = (day: number, hour: number, minute: number) =>
  new Date(2026, 9, day, hour, minute);
const localIso = (day: number, hour: number, minute: number) =>
  localDate(day, hour, minute).toISOString();
const NOW = localDate(13, 9, 0);

const run = (
  overrides: Partial<NonNullable<RawGoogleSheetsStatusModel['lastRun']>>
): NonNullable<RawGoogleSheetsStatusModel['lastRun']> => ({
  status: 'SUCCESS',
  trigger: 'CRON',
  startedAt: localIso(13, 0, 0),
  finishedAt: localIso(13, 0, 5),
  transactionCount: 1234,
  errorMessage: null,
  ...overrides,
});

test('formatRunTime shows time then day/month in local time', () => {
  assert.equal(formatRunTime(localIso(13, 0, 5)), '00:05 13/10');
});

test('formatRunHeadline says today, yesterday, or the date', () => {
  assert.equal(formatRunHeadline(localIso(13, 0, 5), NOW), '00:05 hôm nay');
  assert.equal(formatRunHeadline(localIso(12, 23, 40), NOW), '23:40 hôm qua');
  assert.equal(formatRunHeadline(localIso(10, 8, 0), NOW), '08:00 10/10');
});

test('a user who never connected sees the pitch and cannot run', () => {
  const model = deserializeSheetsStatus(base, NOW);
  assert.equal(model.panel, 'connect');
  assert.equal(model.isEnabled, false);
  assert.equal(model.canRunNow, false);
  assert.equal(model.accountEmail, '');
  assert.equal(model.showReports, false);
});

test('connected and healthy: calm status, sage badge, next run tonight', () => {
  const model = deserializeSheetsStatus(
    { ...connected, lastRun: run({}) },
    NOW
  );
  assert.equal(model.panel, 'status');
  assert.equal(model.isEnabled, true);
  assert.equal(model.canRunNow, true);
  assert.equal(model.accountEmail, 'user@gmail.com');
  assert.equal(model.badgeLabel, 'Đã đồng bộ');
  assert.equal(model.badgeTextClass, 'text-primary');
  assert.equal(model.headline, '00:05 hôm nay');
  assert.equal(model.subline, '1.234 giao dịch · bản đồng bộ tự động');
  assert.equal(model.nextRunLabel, 'Lần kế tiếp:');
  assert.equal(model.nextRunValue, '00:00 tối nay');
  assert.equal(model.showReports, true);
  assert.equal(model.switchNote, '00:00 giờ Việt Nam');
});

test('a manual run is described as manual', () => {
  const model = deserializeSheetsStatus(
    { ...connected, lastRun: run({ trigger: 'MANUAL' }) },
    NOW
  );
  assert.equal(model.subline, '1.234 giao dịch · bản đồng bộ thủ công');
});

test('paused: pebble badge, no night run, still can run now', () => {
  const model = deserializeSheetsStatus(
    { ...connected, syncEnabled: false, lastRun: run({}) },
    NOW
  );
  assert.equal(model.panel, 'status');
  assert.equal(model.isEnabled, false);
  assert.equal(model.canRunNow, true);
  assert.equal(model.badgeLabel, 'Đã tạm dừng');
  assert.equal(model.badgeTextClass, 'text-pebble');
  assert.equal(model.nextRunValue, '');
  assert.equal(
    model.nextRunLabel,
    'Không tự đồng bộ ban đêm. Bạn vẫn có thể đồng bộ ngay.'
  );
});

test('connected but never run: a neutral "not yet" status', () => {
  const model = deserializeSheetsStatus(connected, NOW);
  assert.equal(model.panel, 'status');
  assert.equal(model.badgeLabel, 'Chưa chạy');
  assert.equal(model.headline, 'Chưa đồng bộ');
});

test('a running sync shows the running panel and blocks running again', () => {
  const model = deserializeSheetsStatus(
    {
      ...connected,
      lastRun: run({
        status: 'RUNNING',
        trigger: 'MANUAL',
        finishedAt: null,
        transactionCount: 0,
      }),
    },
    NOW
  );
  assert.equal(model.panel, 'running');
  assert.equal(model.isRunning, true);
  assert.equal(model.canRunNow, false);
  assert.equal(model.runningKicker, 'Đang đồng bộ');
});

test('the first run after connecting is called out as the first', () => {
  const model = deserializeSheetsStatus(
    {
      ...connected,
      lastRun: run({ status: 'RUNNING', trigger: 'CONNECT', finishedAt: null }),
    },
    NOW
  );
  assert.equal(model.panel, 'running');
  assert.equal(model.runningKicker, 'Lần đồng bộ đầu tiên');
  assert.match(model.runningNote, /lần đầu có thể mất một lúc/);
});

test('a failed run shows the stored Vietnamese message and offers a retry', () => {
  const model = deserializeSheetsStatus(
    {
      ...connected,
      lastRun: run({
        status: 'FAILED',
        transactionCount: 0,
        errorMessage:
          'Google tạm thời không phản hồi. Sẽ thử lại lần đồng bộ sau.',
      }),
    },
    NOW
  );
  assert.equal(model.panel, 'problem');
  assert.equal(model.problemAction, 'retry');
  assert.equal(model.problemActionLabel, 'Thử lại ngay');
  assert.equal(model.problemKicker, 'Lần đồng bộ gần nhất thất bại');
  assert.equal(
    model.problemTitle,
    'Google tạm thời không phản hồi. Sẽ thử lại lần đồng bộ sau.'
  );
  assert.match(model.problemBody, /00:00 tối nay/);
  assert.match(model.problemBody, /00:05 13\/10/);
  assert.equal(model.canRunNow, true);
});

test('a failed run while auto sync is off says it can be retried any time', () => {
  const model = deserializeSheetsStatus(
    {
      ...connected,
      syncEnabled: false,
      lastRun: run({ status: 'FAILED', errorMessage: null }),
    },
    NOW
  );
  assert.equal(model.problemTitle, 'Đồng bộ không thành công.');
  assert.match(model.problemBody, /thử lại bất cứ lúc nào/);
});

test('a run left behind by a crash gets a readable Vietnamese title', () => {
  const model = deserializeSheetsStatus(
    {
      ...connected,
      lastRun: run({ status: 'FAILED', errorMessage: 'Interrupted' }),
    },
    NOW
  );
  assert.equal(model.problemTitle, 'Lần đồng bộ bị gián đoạn.');
});

test('needs reconnect: problem panel, switch off and locked, cannot run', () => {
  const model = deserializeSheetsStatus(
    { ...connected, needsReconnect: true, lastRun: run({ status: 'FAILED' }) },
    NOW
  );
  assert.equal(model.panel, 'problem');
  assert.equal(model.problemAction, 'reconnect');
  assert.equal(model.problemActionLabel, 'Kết nối lại');
  assert.equal(model.problemKicker, 'Cần kết nối lại');
  assert.equal(model.isEnabled, false);
  assert.equal(model.canRunNow, false);
  assert.equal(model.switchDisabled, true);
  assert.equal(model.switchNote, 'Tạm dừng cho tới khi kết nối lại');
  assert.equal(model.showReports, false);
});

test('parseSheetsReturn: connected', () => {
  assert.deepEqual(parseSheetsReturn('sheets=connected'), {
    tone: 'success',
    text: 'Đã kết nối Google Sheets. Dữ liệu đang được đồng bộ lần đầu.',
  });
});

test('parseSheetsReturn: every error reason has a Vietnamese message', () => {
  const reasons = [
    'denied',
    'scope',
    'token',
    'state',
    'unavailable',
    'unknown',
    'made-up',
  ];
  const texts = reasons.map((reason) => {
    const message = parseSheetsReturn(`sheets=error&reason=${reason}`);
    assert.equal(message?.tone, 'error');
    return message?.text;
  });
  assert.equal(texts[0], 'Bạn đã từ chối quyền truy cập Google.');
  assert.equal(
    texts[1],
    'Cần cấp quyền tạo bảng tính trong Google Drive để đồng bộ.'
  );
  // an unrecognised reason falls back to the same text as "unknown"
  assert.equal(texts[6], texts[5]);
  assert.ok(texts.every((text) => text && text.length > 0));
});

test('parseSheetsReturn: unrelated or empty query strings are ignored', () => {
  assert.equal(parseSheetsReturn(''), null);
  assert.equal(parseSheetsReturn('tab=security'), null);
  assert.equal(parseSheetsReturn('sheets=whatever'), null);
});
