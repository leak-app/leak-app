import dayjs from 'dayjs';

import type {
  GoogleSheetsStatusModel,
  RawGoogleSheetsStatusModel,
  SheetsReturnMessageModel,
  SheetsRunTone,
} from '../model/types.ts';

const RUN_BADGE: Record<SheetsRunTone, { className: string; label: string }> = {
  none: { className: 'badge-ghost', label: 'Chưa chạy' },
  running: { className: 'badge-info', label: 'Đang chạy' },
  success: { className: 'badge-success', label: 'Thành công' },
  error: { className: 'badge-error', label: 'Thất bại' },
};

const RETURN_ERROR_TEXT: Record<string, string> = {
  denied: 'Bạn đã từ chối quyền truy cập Google.',
  scope: 'Cần cấp quyền tạo bảng tính trong Google Drive để đồng bộ.',
  token: 'Google không trả về quyền truy cập. Vui lòng thử lại.',
  state: 'Phiên kết nối đã hết hạn. Vui lòng thử lại.',
  unavailable: 'Tính năng đồng bộ chưa được bật trên máy chủ.',
  unknown: 'Không kết nối được Google Sheets. Vui lòng thử lại.',
};

const countFormat = new Intl.NumberFormat('vi-VN');

/** "00:05 13/10" in the viewer's local time. */
export function formatRunTime(iso: string): string {
  return dayjs(iso).format('HH:mm DD/MM');
}

export function deserializeSheetsStatus(
  raw: RawGoogleSheetsStatusModel
): GoogleSheetsStatusModel {
  const run = raw.lastRun;
  const runTone: SheetsRunTone = !run
    ? 'none'
    : run.status === 'RUNNING'
      ? 'running'
      : run.status === 'SUCCESS'
        ? 'success'
        : 'error';
  const isRunning = run?.status === 'RUNNING';

  let runText = 'Chưa có lần đồng bộ nào';
  if (run && runTone === 'running') {
    runText = 'Đang đồng bộ…';
  } else if (run && runTone === 'success') {
    runText = `Lần đồng bộ gần nhất: ${formatRunTime(run.finishedAt ?? run.startedAt)} · ${countFormat.format(run.transactionCount)} giao dịch`;
  } else if (run) {
    runText = run.errorMessage ?? 'Lần đồng bộ gần nhất thất bại';
  }

  return {
    ...raw,
    isEnabled: raw.connected && raw.syncEnabled && !raw.needsReconnect,
    isRunning,
    canRunNow: raw.connected && !raw.needsReconnect && !isRunning,
    showReconnect: raw.connected && raw.needsReconnect,
    accountText: raw.googleEmail ? `Tài khoản Google: ${raw.googleEmail}` : '',
    runTone,
    runBadgeClass: RUN_BADGE[runTone].className,
    runBadgeLabel: RUN_BADGE[runTone].label,
    runText,
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
