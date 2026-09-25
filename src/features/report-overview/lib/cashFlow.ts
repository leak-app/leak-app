import { formatVnd } from '@/shared/lib';

import type { CashFlowModel, RawMonthlyCashFlowModel } from '../model/types';

const signedVnd = (n: number) => (n < 0 ? `−${formatVnd(-n)}` : formatVnd(n));

/**
 * The expense delta compares this month so far with the whole previous month,
 * so the copy says "so với cả tháng trước".
 */
export function deserializeCashFlow(
  raw: RawMonthlyCashFlowModel
): CashFlowModel {
  const income = Number(raw.currentMonth.income);
  const expense = Number(raw.currentMonth.expense);
  const prevExpense = Number(raw.previousMonth.expense);
  const net = income - expense;
  const isEmpty = income === 0 && expense === 0;

  let deltaText: string;
  let deltaDirection: CashFlowModel['deltaDirection'] = null;
  if (isEmpty) {
    deltaText = 'Chưa có giao dịch tháng này';
  } else if (prevExpense === 0) {
    deltaText = 'Chưa có dữ liệu tháng trước';
  } else {
    const pct = Math.round(((expense - prevExpense) / prevExpense) * 100);
    if (Math.abs(pct) < 1) {
      deltaDirection = 'flat';
      deltaText = 'Chi tiêu tương đương cả tháng trước';
    } else {
      deltaDirection = pct > 0 ? 'up' : 'down';
      deltaText = `Chi tiêu ${pct > 0 ? '▲' : '▼'} ${Math.abs(pct)}% so với cả tháng trước`;
    }
  }

  return {
    incomeText: formatVnd(income),
    expenseText: formatVnd(expense),
    netText: signedVnd(net),
    isNetNegative: net < 0,
    deltaText,
    deltaDirection,
    isEmpty,
  };
}
