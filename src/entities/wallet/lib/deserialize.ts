import {
  formatCompactVnd,
  formatSignedPercent,
  formatSignedVnd,
  formatVnd,
} from '@/shared/lib';

import type {
  AccountType,
  RawWalletModel,
  RawWalletValuationModel,
  WalletModel,
  WalletValuationModel,
} from '../model/types';

export const WALLET_TYPE_LABELS: Record<AccountType, string> = {
  LIQUID: 'Tiền mặt & tài khoản',
  INVESTMENT: 'Đầu tư',
};

/** formatVnd/formatCompactVnd expect non-negative input; the sign is added here. */
function signed(format: (n: number) => string, amount: number): string {
  return amount < 0 ? `−${format(-amount)}` : format(amount);
}

const GAIN_CLASS = 'text-primary';
const LOSS_CLASS = 'text-danger';
const FLAT_CLASS = 'text-muted';

/** "2026-10-01T00:00:00.000Z" → "01/10". The API sends a date, so the UTC part is the day. */
function formatDay(iso: string): string {
  const [, month, day] = iso.slice(0, 10).split('-');
  return `${day}/${month}`;
}

function deserializeValuation(
  raw: RawWalletValuationModel
): WalletValuationModel {
  const profit = Math.round(Number(raw.profit));
  return {
    hasUpdates: raw.hasValuations,
    lastBalance: raw.lastBalance === null ? null : Number(raw.lastBalance),
    profitWord: profit > 0 ? 'Lãi' : profit < 0 ? 'Lỗ' : 'Không đổi',
    profitText: formatSignedVnd(profit),
    returnText:
      raw.returnPercent === null
        ? null
        : formatSignedPercent(raw.returnPercent),
    toneClass: profit > 0 ? GAIN_CLASS : profit < 0 ? LOSS_CLASS : FLAT_CLASS,
    lastUpdatedText:
      raw.hasValuations && raw.lastValuedAt
        ? `Cập nhật ${formatDay(raw.lastValuedAt)}`
        : 'Chưa cập nhật số dư',
    lastDayText:
      raw.hasValuations && raw.lastValuedAt
        ? formatDay(raw.lastValuedAt)
        : null,
    staleText: raw.isStale ? 'Chưa cập nhật tháng này' : null,
  };
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
    valuation: raw.valuation ? deserializeValuation(raw.valuation) : null,
  };
}
