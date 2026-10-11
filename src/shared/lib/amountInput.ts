const grouped = new Intl.NumberFormat('en-US');

/** "1.250.000", "1,250,000", "-5000", "−5.000" → numbers. Decimals are not supported (VND). */
export function parseAmountInput(text: string): number | null {
  const trimmed = text.trim();
  const negative = trimmed.startsWith('-') || trimmed.startsWith('−');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return null;
  const value = Number(digits.slice(0, 12));
  return negative ? -value : value;
}

export function formatAmountInput(value: number): string {
  const abs = grouped.format(Math.abs(value));
  return value < 0 ? `-${abs}` : abs;
}
