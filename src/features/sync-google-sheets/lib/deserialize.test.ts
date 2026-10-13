/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { RawGoogleSheetsStatusModel } from '../model/types.ts';
import {
  deserializeSheetsStatus,
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

// Built from local time so the assertions hold in any timezone.
const localIso = (hour: number, minute: number) =>
  new Date(2026, 9, 13, hour, minute).toISOString();

test('formatRunTime shows time then day/month in local time', () => {
  assert.equal(formatRunTime(localIso(0, 5)), '00:05 13/10');
});

test('a user who never connected: toggle off, nothing to run, no run text', () => {
  const model = deserializeSheetsStatus(base);
  assert.equal(model.isEnabled, false);
  assert.equal(model.canRunNow, false);
  assert.equal(model.showReconnect, false);
  assert.equal(model.runTone, 'none');
  assert.equal(model.runBadgeLabel, 'Chưa chạy');
  assert.equal(model.runText, 'Chưa có lần đồng bộ nào');
  assert.equal(model.accountText, '');
});

test('connected, enabled and healthy: toggle on and can run now', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    syncEnabled: true,
    googleEmail: 'user@gmail.com',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/x/edit',
  });
  assert.equal(model.isEnabled, true);
  assert.equal(model.canRunNow, true);
  assert.equal(model.accountText, 'Tài khoản Google: user@gmail.com');
});

test('connected with the toggle off: toggle off but can still run now', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    syncEnabled: false,
  });
  assert.equal(model.isEnabled, false);
  assert.equal(model.canRunNow, true);
});

test('a successful run shows when it finished and how many transactions', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    syncEnabled: true,
    lastRun: {
      status: 'SUCCESS',
      trigger: 'CRON',
      startedAt: localIso(0, 0),
      finishedAt: localIso(0, 1),
      transactionCount: 1240,
      errorMessage: null,
    },
  });
  assert.equal(model.runTone, 'success');
  assert.equal(model.runBadgeClass, 'badge-success');
  assert.equal(model.runBadgeLabel, 'Thành công');
  assert.equal(
    model.runText,
    'Lần đồng bộ gần nhất: 00:01 13/10 · 1.240 giao dịch'
  );
});

test('a running sync disables running again and flags polling', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    syncEnabled: true,
    lastRun: {
      status: 'RUNNING',
      trigger: 'MANUAL',
      startedAt: localIso(9, 0),
      finishedAt: null,
      transactionCount: 0,
      errorMessage: null,
    },
  });
  assert.equal(model.isRunning, true);
  assert.equal(model.canRunNow, false);
  assert.equal(model.runTone, 'running');
  assert.equal(model.runBadgeClass, 'badge-info');
  assert.equal(model.runText, 'Đang đồng bộ…');
});

test('a failed run shows the stored Vietnamese message', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    syncEnabled: true,
    lastRun: {
      status: 'FAILED',
      trigger: 'CRON',
      startedAt: localIso(0, 0),
      finishedAt: localIso(0, 0),
      transactionCount: 0,
      errorMessage:
        'Google tạm thời không phản hồi. Sẽ thử lại lần đồng bộ sau.',
    },
  });
  assert.equal(model.runTone, 'error');
  assert.equal(model.runBadgeClass, 'badge-error');
  assert.equal(model.runBadgeLabel, 'Thất bại');
  assert.equal(
    model.runText,
    'Google tạm thời không phản hồi. Sẽ thử lại lần đồng bộ sau.'
  );
});

test('a failed run without a message falls back to a generic line', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    lastRun: {
      status: 'FAILED',
      trigger: 'CRON',
      startedAt: localIso(0, 0),
      finishedAt: null,
      transactionCount: 0,
      errorMessage: null,
    },
  });
  assert.equal(model.runText, 'Lần đồng bộ gần nhất thất bại');
});

test('needs reconnect: toggle off, reconnect banner, cannot run now', () => {
  const model = deserializeSheetsStatus({
    ...base,
    connected: true,
    syncEnabled: true,
    needsReconnect: true,
  });
  assert.equal(model.isEnabled, false);
  assert.equal(model.showReconnect, true);
  assert.equal(model.canRunNow, false);
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
