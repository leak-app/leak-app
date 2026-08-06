import dayjs from 'dayjs';

import type { TransactionModel } from '@/entities/transaction';

interface TransactionItemProps {
  transaction: TransactionModel;
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="bg-surface/60 hover:bg-surface border border-outline/10 rounded-2xl p-3.5 flex items-center justify-between transition-all duration-200 group active:scale-[0.99]">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl shrink-0 bg-surface-bright border border-outline/10 flex items-center justify-center group-hover:scale-105 transition-transform">
          <span className="leading-none">{transaction.category?.emoji}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-on-surface line-clamp-1">
            {transaction.description}
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            {dayjs(transaction.createdAt).format('HH:mm')}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span
          className={`text-sm font-bold ${
            transaction.isExpense ? 'text-error' : 'text-primary font-semibold'
          }`}
        >
          {transaction.isExpense ? '- ' : '+ '}
          {formatCurrency(Number(transaction.amount))}
        </span>
      </div>
    </div>
  );
}
