/** One item of GET /transfers. Decimals arrive as strings; dates as ISO strings. */
export interface RawTransferModel {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: string | number;
  note: string | null;
  /** A date, sent as "2026-10-01T00:00:00.000Z". */
  occurredAt: string;
  /** When the transfer was entered; a later balance update counts it. */
  createdAt: string;
  from: { id: string; name: string };
  to: { id: string; name: string };
}

/** A transfer as one wallet sees it: money coming in or going out. */
export interface TransferItemModel {
  id: string;
  /** "01/10/2026" */
  dateText: string;
  /** "Từ Tiền mặt" or "Đến Tiền mặt". */
  title: string;
  /** "+5,000,000₫" for money in, "−5,000,000₫" for money out. */
  amountText: string;
  toneClass: string;
  note: string | null;
  /** ISO time the transfer was entered. */
  createdAt: string;
}
