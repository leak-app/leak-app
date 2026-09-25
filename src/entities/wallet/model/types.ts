export type AccountType = 'LIQUID' | 'INVESTMENT';

/** Shape returned by GET /wallets (Prisma Decimals arrive as strings). */
export interface RawWalletModel {
  id: string;
  name: string;
  type: AccountType;
  initialBalance: string | number;
  currentBalance: string | number;
  createdAt: string;
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
