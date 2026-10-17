/** Mirrors the limit the API enforces on the phrase. */
export const QUICK_LOG_MAX_LENGTH = 200;

export const QUICK_LOG_PLACEHOLDER = '55k phở bò ví tiền mặt';
export const QUICK_LOG_ERROR_TEXT =
  'Không thể phân tích nội dung. Bạn có thể nhập tay.';

/** The phrase to send, or null when there is nothing worth a request. */
export function normalizeQuickLogText(raw: string): string | null {
  const text = raw.trim();
  if (text.length === 0 || text.length > QUICK_LOG_MAX_LENGTH) return null;
  return text;
}
