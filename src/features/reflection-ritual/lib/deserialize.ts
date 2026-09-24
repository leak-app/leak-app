import { formatVnd } from '@/shared/lib';

import type { ReflectionTally } from '../model/useReflectionSession';

export function formatQueueBanner(total: number): string {
  return `Bạn có ${total} khoản chi cần đánh giá`;
}

export function formatProgress(index: number, total: number): string {
  return `${Math.min(index + 1, total)}/${total}`;
}

export function formatSessionSummary(tally: ReflectionTally): string {
  return `Xong! ${tally.worthIt} đáng giá · ${tally.neutral} bình thường · ${tally.leak} rò rỉ (${formatVnd(tally.leakAmount)})`;
}
