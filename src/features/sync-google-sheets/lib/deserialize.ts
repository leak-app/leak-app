import dayjs from 'dayjs';

import type {
  GoogleSheetsStatusModel,
  RawGoogleSheetsStatusModel,
  SheetsPanel,
  SheetsReturnMessageModel,
  SheetsRunTrigger,
} from '../model/types.ts';

const RETURN_ERROR_TEXT: Record<string, string> = {
  denied: 'Bạn đã từ chối quyền truy cập Google.',
  scope: 'Cần cấp quyền tạo bảng tính trong Google Drive để đồng bộ.',
  token: 'Google không trả về quyền truy cập. Vui lòng thử lại.',
  state: 'Phiên kết nối đã hết hạn. Vui lòng thử lại.',
  unavailable: 'Tính năng đồng bộ chưa được bật trên máy chủ.',
  unknown: 'Không kết nối được Google Sheets. Vui lòng thử lại.',
};

const TRIGGER_TEXT: Record<SheetsRunTrigger, string> = {
  CRON: 'bản đồng bộ tự động',
  MANUAL: 'bản đồng bộ thủ công',
  CONNECT: 'bản đồng bộ đầu tiên',
};

const NEXT_RUN_LABEL = 'Lần kế tiếp:';
const NEXT_RUN_VALUE = '00:00 tối nay';
const PAUSED_NOTE = 'Không tự đồng bộ ban đêm. Bạn vẫn có thể đồng bộ ngay.';
const SCHEDULE_NOTE = '00:00 giờ Việt Nam';
const RECONNECT_NOTE = 'Tạm dừng cho tới khi kết nối lại';
const CRASH_MESSAGE = 'Interrupted';

const countFormat = new Intl.NumberFormat('vi-VN');

/** "00:05 13/10" in the viewer's local time. */
export function formatRunTime(iso: string): string {
  return dayjs(iso).format('HH:mm DD/MM');
}

/** "00:05 hôm nay", "00:05 hôm qua", otherwise "00:05 13/10". */
export function formatRunHeadline(iso: string, now: Date = new Date()): string {
  const time = dayjs(iso);
  const today = dayjs(now);
  if (time.isSame(today, 'day')) return `${time.format('HH:mm')} hôm nay`;
  if (time.isSame(today.subtract(1, 'day'), 'day')) {
    return `${time.format('HH:mm')} hôm qua`;
  }
  return time.format('HH:mm DD/MM');
}

export function deserializeSheetsStatus(
  raw: RawGoogleSheetsStatusModel,
  now: Date = new Date()
): GoogleSheetsStatusModel {
  const run = raw.lastRun;
  const isRunning = run?.status === 'RUNNING';
  const isEnabled = raw.connected && raw.syncEnabled && !raw.needsReconnect;
  const hasFailed = run?.status === 'FAILED';

  let panel: SheetsPanel = 'status';
  if (!raw.connected) panel = 'connect';
  else if (raw.needsReconnect) panel = 'problem';
  else if (isRunning) panel = 'running';
  else if (hasFailed) panel = 'problem';

  // Status panel: when the last good run finished, or that there is none yet.
  const headline = run
    ? formatRunHeadline(run.finishedAt ?? run.startedAt, now)
    : 'Chưa đồng bộ';
  const subline =
    run && run.status === 'SUCCESS'
      ? `${countFormat.format(run.transactionCount)} giao dịch · ${TRIGGER_TEXT[run.trigger]}`
      : 'Lần đầu sẽ chạy lúc 00:00 hoặc khi bạn bấm Đồng bộ ngay';

  // Problem panel.
  const failedAt = run ? formatRunTime(run.finishedAt ?? run.startedAt) : '';
  const failedTitle =
    run?.errorMessage && run.errorMessage !== CRASH_MESSAGE
      ? run.errorMessage
      : run?.errorMessage === CRASH_MESSAGE
        ? 'Lần đồng bộ bị gián đoạn.'
        : 'Đồng bộ không thành công.';
  const retryNote = isEnabled
    ? `Leak sẽ thử lại lúc ${NEXT_RUN_VALUE}.`
    : 'Tự đồng bộ đang tắt, bạn có thể thử lại bất cứ lúc nào.';

  return {
    ...raw,
    isEnabled,
    isRunning,
    canRunNow: raw.connected && !raw.needsReconnect && !isRunning,
    panel,
    accountEmail: raw.googleEmail ?? '',

    switchNote: raw.needsReconnect ? RECONNECT_NOTE : SCHEDULE_NOTE,
    switchDisabled: raw.needsReconnect,
    showReports: panel === 'status' && Boolean(raw.spreadsheetUrl),

    badgeLabel: !run
      ? 'Chưa chạy'
      : raw.syncEnabled
        ? 'Đã đồng bộ'
        : 'Đã tạm dừng',
    badgeTextClass: run && raw.syncEnabled ? 'text-primary' : 'text-pebble',
    badgeDotClass: run && raw.syncEnabled ? 'bg-primary' : 'bg-pebble',
    headline,
    subline,
    nextRunLabel: raw.syncEnabled ? NEXT_RUN_LABEL : PAUSED_NOTE,
    nextRunValue: raw.syncEnabled ? NEXT_RUN_VALUE : '',

    runningKicker:
      run?.trigger === 'CONNECT' ? 'Lần đồng bộ đầu tiên' : 'Đang đồng bộ',
    runningNote:
      run?.trigger === 'CONNECT'
        ? 'Với nhiều giao dịch, lần đầu có thể mất một lúc. Bạn có thể rời trang này — Leak vẫn tiếp tục.'
        : 'Bạn có thể rời trang này — Leak vẫn tiếp tục.',

    problemAction: raw.needsReconnect ? 'reconnect' : 'retry',
    problemActionLabel: raw.needsReconnect ? 'Kết nối lại' : 'Thử lại ngay',
    problemKicker: raw.needsReconnect
      ? 'Cần kết nối lại'
      : 'Lần đồng bộ gần nhất thất bại',
    problemTitle: raw.needsReconnect
      ? 'Leak không còn quyền truy cập Google của bạn.'
      : failedTitle,
    problemBody: raw.needsReconnect
      ? 'Hãy kết nối lại để tiếp tục đồng bộ. Bảng tính hiện có sẽ được dùng tiếp.'
      : `${retryNote} Lần chạy lúc ${failedAt}.`,
  };
}

/** Reads the `?sheets=connected` / `?sheets=error&reason=…` the API redirects back with. */
export function parseSheetsReturn(
  search: string
): SheetsReturnMessageModel | null {
  const params = new URLSearchParams(search);
  const result = params.get('sheets');
  if (result === 'connected') {
    return {
      tone: 'success',
      text: 'Đã kết nối Google Sheets. Dữ liệu đang được đồng bộ lần đầu.',
    };
  }
  if (result === 'error') {
    const reason = params.get('reason') ?? 'unknown';
    return {
      tone: 'error',
      text: RETURN_ERROR_TEXT[reason] ?? RETURN_ERROR_TEXT.unknown,
    };
  }
  return null;
}
