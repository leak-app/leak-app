import dayjs from 'dayjs';

import {
  formatCompactVnd,
  formatSignedPercent,
  formatSignedVnd,
  formatVnd,
  formatVndParts,
} from '@/shared/lib';

import type {
  ChecklistRowModel,
  MonthBarModel,
  MonthlyChecklistModel,
  PortfolioEntryModel,
  PortfolioHeroModel,
  PortfolioModel,
  PortfolioWalletModel,
  RawMonthPointModel,
  RawPortfolioModel,
  RawPortfolioWalletModel,
  RawValuationModel,
  ResultModel,
  ValuationHistoryItemModel,
} from '../model/types';

const GAIN_CLASS = 'text-primary';
const LOSS_CLASS = 'text-danger';
const FLAT_CLASS = 'text-muted';

const toneClass = (amount: number) =>
  amount > 0 ? GAIN_CLASS : amount < 0 ? LOSS_CLASS : FLAT_CLASS;

const barClass = (amount: number) =>
  amount > 0 ? 'bg-primary' : amount < 0 ? 'bg-danger' : 'bg-pebble';

const wordFor = (amount: number) =>
  amount > 0 ? 'Lãi' : amount < 0 ? 'Lỗ' : 'Không đổi';

/** The user's answer to "lãi hay lỗ?": a word, a signed amount and a colour. */
function result(amount: number): ResultModel {
  const rounded = Math.round(amount);
  return {
    word: wordFor(rounded),
    amountText: formatSignedVnd(rounded),
    toneClass: toneClass(rounded),
  };
}

/** "+518,000" and "₫" apart, so the symbol can be set smaller. */
function signedParts(amount: number) {
  const rounded = Math.round(amount);
  const { value, symbol } = formatVndParts(Math.abs(rounded));
  const sign = rounded > 0 ? '+' : rounded < 0 ? '−' : '';
  return { value: `${sign}${value}`, symbol };
}

/** The balance can be negative for an odd wallet; the minus goes in front of the number. */
function formatBalance(amount: number): string {
  return amount < 0 ? `−${formatVnd(-amount)}` : formatVnd(amount);
}

/** "2026-10-01T00:00:00.000Z" → "01/10/2026". The API sends a date, so the UTC part is the day. */
function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
}

/** "2026-10-01T00:00:00.000Z" → "01/10". */
function formatDay(iso: string): string {
  const [, month, day] = iso.slice(0, 10).split('-');
  return `${day}/${month}`;
}

function deserializeWallet(raw: RawPortfolioWalletModel): PortfolioWalletModel {
  const profit = Number(raw.profit);
  return {
    id: raw.id,
    name: raw.name,
    valueText: formatBalance(Number(raw.currentBalance)),
    hasUpdates: raw.hasValuations,
    profit: raw.hasValuations
      ? {
          ...result(profit),
          returnText:
            raw.returnPercent === null
              ? null
              : formatSignedPercent(raw.returnPercent),
        }
      : null,
    updatedText:
      raw.hasValuations && raw.lastValuedAt
        ? `Cập nhật ${formatDate(raw.lastValuedAt)}`
        : 'Chưa cập nhật số dư',
    isStale: raw.isStale,
  };
}

function deserializeMonths(raw: RawMonthPointModel[]): MonthBarModel[] {
  const profits = raw.map((point) => Math.round(Number(point.profit)));
  const biggest = Math.max(...profits.map(Math.abs), 0);
  return raw.map((point, index) => {
    const [year, month] = point.month.split('-');
    const profit = profits[index];
    const balanceText = formatCompactVnd(Math.max(Number(point.balance), 0));
    const outcome = result(profit);
    return {
      key: point.month,
      label: `T${Number(month)}`,
      direction: profit > 0 ? 'up' : profit < 0 ? 'down' : 'flat',
      // A sliver stays visible so a month with a result never looks missing.
      sizePercent:
        biggest > 0
          ? Math.max(4, Math.round((Math.abs(profit) / biggest) * 100))
          : 4,
      barClass: barClass(profit),
      readout: {
        ...outcome,
        monthText: `Tháng ${Number(month)}`,
        balanceText,
      },
      ariaLabel: `Tháng ${Number(month)}/${year}: ${outcome.word.toLowerCase()} ${outcome.amountText}, số dư ${balanceText}`,
    };
  });
}

function deserializeHero(
  raw: RawPortfolioModel,
  months: RawMonthPointModel[],
  monthNumber: number,
  isPending: boolean
): PortfolioHeroModel {
  const hasUpdates = raw.totals.hasValuations;
  const current = months.at(-1);
  const previous = months.length > 1 ? months.at(-2) : undefined;
  const sinceStart = Math.round(Number(raw.totals.profit));
  const sinceStartReturn =
    raw.totals.returnPercent === null
      ? null
      : formatSignedPercent(raw.totals.returnPercent);

  const showMonth = hasUpdates && !isPending && current !== undefined;
  const profit = current ? Math.round(Number(current.profit)) : 0;

  let pendingNote: string | null = null;
  if (!showMonth) {
    pendingNote = hasUpdates
      ? 'Có kết quả khi mọi ví đã cập nhật.'
      : 'Nhập số dư để bắt đầu theo dõi lãi lỗ.';
  }

  return {
    question: `Tháng ${monthNumber} · lãi hay lỗ?`,
    hasUpdates,
    month: showMonth
      ? { ...result(profit), valueParts: signedParts(profit) }
      : null,
    monthReturnText:
      showMonth && current.returnPercent !== null
        ? formatSignedPercent(current.returnPercent)
        : null,
    pendingNote,
    previousMonth:
      !showMonth && hasUpdates && previous
        ? {
            ...result(Number(previous.profit)),
            label: `Tháng ${Number(previous.month.split('-')[1])}`,
          }
        : null,
    totalText: formatBalance(Number(raw.totals.value)),
    sinceStartLabel: sinceStartReturn
      ? `Lãi từ đầu · ${sinceStartReturn}`
      : 'Lãi từ đầu',
    sinceStartText: formatSignedVnd(sinceStart),
    sinceStartToneClass: toneClass(sinceStart),
    capitalText: formatVnd(Math.max(0, Number(raw.totals.capital))),
  };
}

function deserializeChecklist(
  raw: RawPortfolioModel,
  monthNumber: number
): MonthlyChecklistModel | null {
  const stale = raw.wallets.filter((wallet) => wallet.isStale);
  if (stale.length === 0) return null;

  // A wallet created this month and never updated is not asked for yet.
  const listed = raw.wallets.filter(
    (wallet) => wallet.isStale || wallet.hasValuations
  );
  const next = stale[0];
  const rows: ChecklistRowModel[] = listed.map((wallet) => {
    const isDone = !wallet.isStale;
    return {
      id: wallet.id,
      name: wallet.name,
      isDone,
      meta: isDone
        ? `Đã cập nhật ${wallet.lastValuedAt ? formatDay(wallet.lastValuedAt) : ''}`.trim()
        : wallet.id === next.id
          ? 'Tiếp theo'
          : 'Chưa cập nhật tháng này',
      result: isDone ? result(Number(wallet.monthProfit)) : null,
    };
  });

  const left = stale.length;
  const prompt =
    listed.length === 1
      ? 'Đã sang tháng mới. Cập nhật số dư để biết tháng này lãi hay lỗ.'
      : left === 1
        ? 'Đã sang tháng mới. Còn 1 ví cần cập nhật số dư.'
        : `Đã sang tháng mới. ${left} ví cần cập nhật số dư để biết tháng này lãi hay lỗ.`;

  return {
    title: `Cập nhật tháng ${monthNumber}`,
    progressText: `${listed.length - left}/${listed.length} ví`,
    prompt,
    rows,
    nextWalletId: next.id,
    nextLabel: `Cập nhật ${next.name}`,
  };
}

function deserializeEntry(
  raw: RawPortfolioModel,
  months: RawMonthPointModel[],
  monthNumber: number
): PortfolioEntryModel {
  const staleCount = raw.staleWalletIds.length;
  if (staleCount > 0) {
    return {
      kind: 'reminder',
      hint: 'Đã sang tháng mới, cập nhật số dư',
      result: null,
      staleCount,
    };
  }
  const current = months.at(-1);
  if (raw.totals.hasValuations && current) {
    return {
      kind: 'result',
      hint: `Tháng ${monthNumber} · `,
      result: result(Number(current.profit)),
      staleCount,
    };
  }
  return {
    kind: 'empty',
    hint: 'Nhập số dư để theo dõi lãi lỗ',
    result: null,
    staleCount,
  };
}

export function deserializePortfolio(raw: RawPortfolioModel): PortfolioModel {
  const lastKey = raw.months.at(-1)?.month;
  const monthNumber = lastKey
    ? Number(lastKey.split('-')[1])
    : dayjs().month() + 1;
  const isPending = raw.staleWalletIds.length > 0;

  return {
    hasWallets: raw.wallets.length > 0,
    hero: deserializeHero(raw, raw.months, monthNumber, isPending),
    checklist: deserializeChecklist(raw, monthNumber),
    wallets: raw.wallets.map(deserializeWallet),
    months: deserializeMonths(raw.months),
    entry: deserializeEntry(raw, raw.months, monthNumber),
  };
}

/** `raw` is newest first, as the API sends it. */
export function deserializeValuations(
  raw: RawValuationModel[]
): ValuationHistoryItemModel[] {
  return raw.map((item, index) => {
    const isBaseline = item.kind === 'BASELINE';
    const netFlow = Math.round(Number(item.netFlow));
    const gain = Math.round(Number(item.gain));
    const outcome = result(gain);
    return {
      id: item.id,
      dateText: formatDate(item.valuedAt),
      createdAt: item.createdAt,
      balanceText: formatVnd(Number(item.balance)),
      flow: isBaseline
        ? { label: 'Bắt đầu theo dõi', amountText: null }
        : netFlow === 0
          ? { label: 'Không nạp/rút', amountText: null }
          : {
              label: netFlow > 0 ? 'Nạp thêm' : 'Rút bớt',
              amountText: formatSignedVnd(netFlow),
            },
      result: isBaseline
        ? {
            label: 'Số dư mốc',
            amountText: null,
            returnText: null,
            toneClass: 'text-secondary',
          }
        : {
            label: outcome.word,
            amountText: outcome.amountText,
            returnText:
              item.periodReturn === null
                ? null
                : formatSignedPercent(item.periodReturn),
            toneClass: outcome.toneClass,
          },
      isLatest: index === 0,
      canUndo: index === 0,
    };
  });
}
