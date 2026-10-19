export type AccountType = 'LIQUID' | 'INVESTMENT';

/** Shape returned by GET /wallets (Prisma Decimals arrive as strings). */
/** Profit figures of an investment wallet (GET /wallets). Decimals arrive as strings. */
export interface RawWalletValuationModel {
  hasValuations: boolean;
  lastValuedAt: string | null;
  lastBalance: string | number | null;
  profit: string | number;
  capital: string | number;
  returnPercent: number | null;
  isStale: boolean;
}

export interface RawWalletModel {
  id: string;
  name: string;
  type: AccountType;
  initialBalance: string | number;
  currentBalance: string | number;
  createdAt: string;
  /** null for wallets that are not investment wallets. */
  valuation?: RawWalletValuationModel | null;
}

/** Profit figures ready to show on an investment wallet row. */
export interface WalletValuationModel {
  hasUpdates: boolean;
  /** Balance of the latest update, the base of the next one. */
  lastBalance: number | null;
  /** "Lãi", "Lỗ" or "Không đổi". */
  profitWord: string;
  /** "+2,000,000₫", "−500,000₫" or "0₫". */
  profitText: string;
  /** "+4.0%" or null when there is no capital to compare with. */
  returnText: string | null;
  /** Colour class for the profit figures: sage for a gain, apricot for a loss. */
  toneClass: string;
  /** "Cập nhật 01/10" or "Chưa cập nhật số dư". */
  lastUpdatedText: string;
  /** "01/10", the day of the latest update. */
  lastDayText: string | null;
  /** Set when this month has no update yet. */
  staleText: string | null;
}

export interface WalletModel {
  id: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  currentBalance: number;
  createdAt: string;
  // Added for UI (see lib/deserialize.ts)
  balanceText: string;
  compactBalanceText: string;
  typeLabel: string;
  isNegative: boolean;
  /** "Cập nhật số dư" for investment wallets, "Điều chỉnh số dư" for liquid ones. */
  balanceActionLabel: string;
  /** null for wallets that are not investment wallets. */
  valuation: WalletValuationModel | null;
}

export interface CreateWalletParamsModel {
  name: string;
  type: AccountType;
  initialBalance: number;
}

export interface UpdateWalletParamsModel {
  id: string;
  name?: string;
  initialBalance?: number;
}

export interface WalletGroupModel {
  type: AccountType;
  title: string;
  totalText: string;
  wallets: WalletModel[];
}

export interface WalletSummaryModel {
  totalText: string;
  countTexts: string[];
  groups: WalletGroupModel[];
  /** False when only one wallet is active: the API refuses to archive the last one. */
  canArchive: boolean;
}
