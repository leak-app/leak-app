import type { ReactNode } from 'react';

import type { CategoryModel } from '@/entities/category';
import {
  OUTCOME_FILTER_OPTIONS,
  type SpendOutcome,
} from '@/entities/transaction';
import type { WalletModel } from '@/entities/wallet';
import { BottomSheet, Button, Chip } from '@/shared/ui';

import type { MonthOptionModel } from '../lib/filterSummary';

interface TransactionFilterSheetProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  monthOptions: MonthOptionModel[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  /** Hidden for income, which has no outcome. */
  showOutcome: boolean;
  outcomeFilter?: SpendOutcome;
  onOutcomeFilterChange: (outcome?: SpendOutcome) => void;
  categories: CategoryModel[];
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
  wallets: WalletModel[];
  selectedAccountId: string;
  onAccountChange: (id: string) => void;
}

function FilterGroup({
  title,
  className = 'flex flex-wrap gap-2',
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <h4 className="text-label text-muted">{title}</h4>
      <div className={className}>{children}</div>
    </section>
  );
}

/** Every filter beyond the type: they apply as soon as they are tapped. */
export function TransactionFilterSheet({
  open,
  onClose,
  onReset,
  monthOptions,
  selectedMonth,
  onMonthChange,
  showOutcome,
  outcomeFilter,
  onOutcomeFilterChange,
  categories,
  selectedCategoryId,
  onCategoryChange,
  wallets,
  selectedAccountId,
  onAccountChange,
}: TransactionFilterSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Bộ lọc"
    >
      <div className="flex max-h-[60dvh] flex-col gap-5 overflow-y-auto">
        <FilterGroup
          title="Tháng"
          className="grid grid-cols-3 gap-2"
        >
          {monthOptions.map((option) => (
            <Chip
              key={option.value || 'all'}
              compact
              selected={option.value === selectedMonth}
              onClick={() => onMonthChange(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </FilterGroup>

        {showOutcome && (
          <FilterGroup title="Đánh giá chi tiêu">
            {OUTCOME_FILTER_OPTIONS.map((option) => (
              <Chip
                key={option.label}
                compact
                selected={outcomeFilter === option.value}
                onClick={() => onOutcomeFilterChange(option.value)}
              >
                {option.label}
              </Chip>
            ))}
          </FilterGroup>
        )}

        <FilterGroup title="Danh mục">
          <Chip
            compact
            selected={selectedCategoryId === ''}
            onClick={() => onCategoryChange('')}
          >
            Tất cả
          </Chip>
          {categories.map((category) => (
            <Chip
              key={category.id}
              compact
              selected={selectedCategoryId === category.id}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.emoji} {category.name}
            </Chip>
          ))}
        </FilterGroup>

        {wallets.length > 1 && (
          <FilterGroup title="Ví">
            <Chip
              compact
              selected={selectedAccountId === ''}
              onClick={() => onAccountChange('')}
            >
              Tất cả
            </Chip>
            {wallets.map((wallet) => (
              <Chip
                key={wallet.id}
                compact
                selected={selectedAccountId === wallet.id}
                onClick={() => onAccountChange(wallet.id)}
              >
                {wallet.name}
              </Chip>
            ))}
          </FilterGroup>
        )}
      </div>

      <div className="mt-5 flex gap-2.5">
        <Button
          variant="secondary"
          onClick={onReset}
        >
          Xóa bộ lọc
        </Button>
        <Button
          className="flex-1"
          onClick={onClose}
        >
          Xong
        </Button>
      </div>
    </BottomSheet>
  );
}
