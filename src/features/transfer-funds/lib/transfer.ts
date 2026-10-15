export interface TransferWalletModel {
  id: string;
  type: 'LIQUID' | 'INVESTMENT';
  createdAt: string;
}

export interface TransferDefaultsModel {
  fromId: string;
  toId: string;
}

const oldestFirst = (a: TransferWalletModel, b: TransferWalletModel) =>
  a.createdAt.localeCompare(b.createdAt);

/**
 * Starting wallets for the sheet. A preset side is kept; the other side is the
 * oldest wallet of the natural type (cash goes into the fund, not the other way
 * round), and never the same wallet. Empty strings when there is nothing to pick.
 */
export function pickTransferDefaults(
  wallets: readonly TransferWalletModel[],
  preset: { fromId?: string; toId?: string }
): TransferDefaultsModel {
  const sorted = [...wallets].sort(oldestFirst);
  const firstOther = (exclude: string, type?: TransferWalletModel['type']) =>
    sorted.find((w) => w.id !== exclude && (!type || w.type === type)) ??
    sorted.find((w) => w.id !== exclude);

  if (preset.fromId && preset.toId) {
    return { fromId: preset.fromId, toId: preset.toId };
  }
  if (preset.toId) {
    return {
      fromId: firstOther(preset.toId, 'LIQUID')?.id ?? '',
      toId: preset.toId,
    };
  }
  if (preset.fromId) {
    return {
      fromId: preset.fromId,
      toId: firstOther(preset.fromId, 'INVESTMENT')?.id ?? '',
    };
  }
  const from = sorted.find((w) => w.type === 'LIQUID') ?? sorted[0];
  return {
    fromId: from?.id ?? '',
    toId: from ? (firstOther(from.id, 'INVESTMENT')?.id ?? '') : '',
  };
}

/** The first problem with the form, in Vietnamese, or null when it can be sent. */
export function validateTransfer(input: {
  fromId: string;
  toId: string;
  amount: number | null;
}): string | null {
  if (!input.fromId) return 'Hãy chọn ví nguồn';
  if (!input.toId) return 'Hãy chọn ví nhận';
  if (input.fromId === input.toId) {
    return 'Ví nguồn và ví nhận phải khác nhau';
  }
  if (input.amount === null || input.amount <= 0) {
    return 'Nhập số tiền lớn hơn 0';
  }
  return null;
}

/** Biggest amount the API stores (12 digits). */
const MAX_AMOUNT = 999_999_999_999;

/** A quick chip adds to what is typed ("+2tr" twice makes 4,000,000). */
export function addToAmount(current: number | null, add: number): number {
  return Math.min((current ?? 0) + add, MAX_AMOUNT);
}
