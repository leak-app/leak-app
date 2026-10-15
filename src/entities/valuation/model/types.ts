type Decimal = string | number;

/** GET /investments/summary. Decimals arrive as strings. */
export interface RawPortfolioModel {
  totals: {
    value: Decimal;
    capital: Decimal;
    profit: Decimal;
    returnPercent: number | null;
    hasValuations: boolean;
  };
  wallets: RawPortfolioWalletModel[];
  months: RawMonthPointModel[];
  staleWalletIds: string[];
}

export interface RawPortfolioWalletModel {
  id: string;
  name: string;
  currentBalance: Decimal;
  hasValuations: boolean;
  lastValuedAt: string | null;
  lastBalance: Decimal | null;
  profit: Decimal;
  /** Profit entered during the current month. */
  monthProfit: Decimal;
  capital: Decimal;
  returnPercent: number | null;
  isStale: boolean;
}

export interface RawMonthPointModel {
  /** "2026-10" */
  month: string;
  balance: Decimal;
  profit: Decimal;
  returnPercent: number | null;
}

/** One update in GET /wallets/:id/valuations. */
export interface RawValuationModel {
  id: string;
  kind: 'BASELINE' | 'UPDATE';
  /** A date, sent as "2026-10-01T00:00:00.000Z". */
  valuedAt: string;
  /** When the update was entered; transfers made before it are counted in it. */
  createdAt: string;
  previousBalance: Decimal;
  netFlow: Decimal;
  balance: Decimal;
  gain: Decimal;
  periodReturn: number | null;
}

/** A profit or loss, split so a screen can mask the amount and keep the word. */
export interface ResultModel {
  /** "Lãi", "Lỗ" or "Không đổi". */
  word: string;
  /** "+518,000₫" */
  amountText: string;
  toneClass: string;
}

/** The answer to "lãi hay lỗ?" for the current month. */
export interface PortfolioHeroModel {
  /** "Tháng 10 · lãi hay lỗ?" */
  question: string;
  hasUpdates: boolean;
  /** The month's profit, or null while it is not known yet (shown as "—"). */
  month:
    (ResultModel & { valueParts: { value: string; symbol: string } }) | null;
  /** "+1.3%" */
  monthReturnText: string | null;
  /** Explains why there is no result yet. */
  pendingNote: string | null;
  /** Last month's result, offered next to `pendingNote`. */
  previousMonth: (ResultModel & { label: string }) | null;
  /** "41,250,000₫" */
  totalText: string;
  /** "Lãi từ đầu · +6.0%" */
  sinceStartLabel: string;
  /** "+2,350,000₫" */
  sinceStartText: string;
  sinceStartToneClass: string;
  /** "38,900,000₫" */
  capitalText: string;
}

export interface PortfolioWalletModel {
  id: string;
  name: string;
  /** "12,600,000₫" */
  valueText: string;
  hasUpdates: boolean;
  /** Profit since the first update, null before one. */
  profit: (ResultModel & { returnText: string | null }) | null;
  /** "Cập nhật 01/10/2026" or "Chưa cập nhật số dư". */
  updatedText: string;
  isStale: boolean;
}

export interface MonthBarModel {
  /** "2026-10" */
  key: string;
  /** "T10" */
  label: string;
  /** Which side of the zero line the bar grows on. */
  direction: 'up' | 'down' | 'flat';
  /** 0 to 100, relative to the biggest profit or loss. */
  sizePercent: number;
  barClass: string;
  /** What is read out when the bar is selected. */
  readout: ResultModel & { monthText: string; balanceText: string };
  /** Spoken name of the bar. */
  ariaLabel: string;
}

export interface ChecklistRowModel {
  id: string;
  name: string;
  isDone: boolean;
  /** "Đã cập nhật 01/11", "Tiếp theo" or "Chưa cập nhật tháng này". */
  meta: string;
  /** This month's result of a wallet that is done. */
  result: ResultModel | null;
}

/** Wallets to update one after another once a new month has begun. */
export interface MonthlyChecklistModel {
  /** "Cập nhật tháng 11" */
  title: string;
  /** "1/3 ví" */
  progressText: string;
  prompt: string;
  rows: ChecklistRowModel[];
  nextWalletId: string;
  /** "Cập nhật Vàng" */
  nextLabel: string;
}

/** What the link to the Investment page says on Overview and Profile. */
export interface PortfolioEntryModel {
  kind: 'reminder' | 'result' | 'empty';
  /** The line under the title; for `result` the text before the result. */
  hint: string;
  result: ResultModel | null;
  /** Wallets without an update this month. */
  staleCount: number;
}

export interface PortfolioModel {
  hasWallets: boolean;
  hero: PortfolioHeroModel;
  checklist: MonthlyChecklistModel | null;
  wallets: PortfolioWalletModel[];
  months: MonthBarModel[];
  entry: PortfolioEntryModel;
}

export interface ValuationHistoryItemModel {
  id: string;
  /** "01/10/2026" */
  dateText: string;
  /** ISO time the update was entered. */
  createdAt: string;
  balanceText: string;
  /** Money added or withdrawn since the last update, or "Bắt đầu theo dõi". */
  flow: { label: string; amountText: string | null };
  /** The profit or loss of the period, or "Số dư mốc" for a baseline. */
  result: {
    label: string;
    amountText: string | null;
    returnText: string | null;
    toneClass: string;
  };
  isLatest: boolean;
  /** Only the newest update can be undone. */
  canUndo: boolean;
}
