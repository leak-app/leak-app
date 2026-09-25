/** Max 12 digits (999.999.999.999) so the amount fits Decimal(12, 2). */
const MAX_DIGITS = 12;

/** Next amount string after a numpad key. Keys: '0'–'9', '.000', 'Backspace'. */
export function applyNumpadKey(prev: string, key: string): string {
  if (key === 'Backspace') return prev.length <= 1 ? '0' : prev.slice(0, -1);
  if (key === '.000') {
    if (prev === '0') return '0';
    return prev.length + 3 > MAX_DIGITS ? prev : prev + '000';
  }
  if (prev === '0') return key;
  return prev.length >= MAX_DIGITS ? prev : prev + key;
}
