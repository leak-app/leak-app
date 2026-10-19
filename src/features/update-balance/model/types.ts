/** Body of POST /wallets/:id/valuations. */
export interface CreateValuationParamsModel {
  walletId: string;
  /** What the user typed. */
  balance: number;
  /** The wallet balance the user saw; the API refuses when it moved meanwhile. */
  expectedBalance: number;
  /** Counts the difference as capital instead of profit. First update only. */
  asBaseline: boolean;
}

export interface BalancePreviewInputModel {
  currentBalance: number;
  initialBalance: number;
  /** Balance of the latest update, null before the first one. */
  lastBalance: number | null;
  /** null while the field is empty. */
  entered: number | null;
  asBaseline: boolean;
}

/** What saving would do, in numbers. Formatted by `deserializeBalancePreview`. */
export interface BalancePreviewModel {
  /** Money moved in (+) or out (−) since the last update. */
  netFlow: number;
  /** Change to the wallet balance. */
  adjustment: number;
  /** Profit (+) or loss (−); 0 for a baseline. */
  gain: number;
  /** Percent with one decimal; null for a baseline or without a base. */
  returnPercent: number | null;
  isBaseline: boolean;
}

/** Context the preview card needs besides the numbers. */
export interface BalancePreviewContextModel {
  isFirstUpdate: boolean;
  /** Balance of the latest update, null before the first one. */
  lastBalance: number | null;
  /** "01/10", the day of the latest update. */
  lastDayText: string | null;
}

/** What saving would do to a liquid wallet; there is no profit to show. */
export interface LiquidAdjustmentViewModel {
  /** "+200.000₫" or "−300.000₫", the change to the wallet balance. */
  differenceText: string;
  toneClass: string;
}

/** Texts and classes of the preview card. */
export interface BalancePreviewViewModel {
  /** "Lãi", "Lỗ", "Không đổi" or "Số dư mốc". */
  label: string;
  amountText: string;
  /** "+5.0% · ước tính", shown beside the amount. */
  returnNote: string | null;
  toneClass: string;
  /** Border and background of the card. */
  cardClass: string;
  /** "Lần trước · 01/10" and the balance then; null for the first update. */
  previous: { label: string; amountText: string } | null;
  /** Money moved in or out since the last update. */
  flowText: string;
  note: string | null;
}
