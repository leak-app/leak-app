import { formatCompactVnd, formatVnd } from '@/shared/lib';

import type { AccountType, RawWalletModel, WalletModel } from '../model/types';

export const WALLET_TYPE_LABELS: Record<AccountType, string> = {
  LIQUID: 'Tiền mặt & tài khoản',
  INVESTMENT: 'Đầu tư',
};

/** formatVnd/formatCompactVnd expect non-negative input; the sign is added here. */
function signed(format: (n: number) => string, amount: number): string {
  return amount < 0 ? `−${format(-amount)}` : format(amount);
}

export function deserializeWallet(raw: RawWalletModel): WalletModel {
  const initialBalance = Number(raw.initialBalance);
  const currentBalance = Number(raw.currentBalance);
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    createdAt: raw.createdAt,
    initialBalance,
    currentBalance,
    balanceText: signed(formatVnd, currentBalance),
    compactBalanceText: signed(formatCompactVnd, currentBalance),
    typeLabel: WALLET_TYPE_LABELS[raw.type],
    isNegative: currentBalance < 0,
  };
}
