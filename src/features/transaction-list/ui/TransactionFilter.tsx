import dayjs from 'dayjs';
import { useState } from 'react';

import type { CategoryModel } from '@/entities/category';
import {
  OUTCOME_FILTER_OPTIONS,
  type SpendOutcome,
  type TransactionType,
} from '@/entities/transaction';
import type { WalletModel } from '@/entities/wallet';
import { MagnifyingGlassIcon, SlidersIcon, XMarkIcon } from '@/shared/icons';
import { Chip } from '@/shared/ui';

import {
  buildFilterSummary,
  buildMonthOptions,
  countActiveFilters,
} from '../lib/filterSummary';
import { TransactionFilterSheet } from './TransactionFilterSheet';

interface TransactionFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  typeFilter?: TransactionType;
  onTypeFilterChange: (type?: TransactionType) => void;
  outcomeFilter?: SpendOutcome;
  onOutcomeFilterChange: (outcome?: SpendOutcome) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
  categories: CategoryModel[];
  selectedAccountId: string;
  onAccountChange: (id: string) => void;
  wallets: WalletModel[];
}

const TYPE_OPTIONS: { value?: TransactionType; label: string }[] = [
  { value: undefined, label: 'Tất cả' },
  { value: 'EXPENSE', label: 'Chi tiêu' },
  { value: 'INCOME', label: 'Thu nhập' },
];

/** Search and the type on screen; month, outcome, category and wallet in one sheet. */
export function TransactionFilter({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  outcomeFilter,
  onOutcomeFilterChange,
  selectedMonth,
  onMonthChange,
  selectedCategoryId,
  onCategoryChange,
  categories,
  selectedAccountId,
  onAccountChange,
  wallets,
}: TransactionFilterProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const currentMonth = dayjs().format('YYYY-MM');
  // Income has no outcome, so the list ignores it there and the filter must not count it.
  const showOutcome = typeFilter !== 'INCOME';
  const activeOutcome = showOutcome ? outcomeFilter : undefined;
  const activeCount = countActiveFilters({
    month: selectedMonth,
    currentMonth,
    categoryId: selectedCategoryId,
    accountId: selectedAccountId,
    outcome: activeOutcome,
  });
  const summary = buildFilterSummary({
    month: selectedMonth,
    categoryLabel: categories.find((cat) => cat.id === selectedCategoryId)
      ?.name,
    walletLabel: wallets.find((wallet) => wallet.id === selectedAccountId)
      ?.name,
    outcomeLabel: OUTCOME_FILTER_OPTIONS.find(
      (option) => option.value === activeOutcome && option.value !== undefined
    )?.label,
  });
  const filterLabel =
    activeCount > 0 ? `Bộ lọc, đang dùng ${activeCount}` : 'Bộ lọc';

  const resetFilters = () => {
    onMonthChange(currentMonth);
    onCategoryChange('');
    onAccountChange('');
    onOutcomeFilterChange(undefined);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <label className="input input-bordered h-11 min-w-0 flex-1 items-center gap-2 rounded-full">
          <MagnifyingGlassIcon
            size={20}
            className="text-on-surface-variant shrink-0"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm giao dịch..."
            className="grow text-sm text-on-surface placeholder:text-on-surface-variant/60"
          />
          {search && (
            <button
              type="button"
              aria-label="Xóa tìm kiếm"
              onClick={() => onSearchChange('')}
              className="btn btn-ghost btn-circle btn-xs text-on-surface-variant hover:text-on-surface"
            >
              <XMarkIcon size={16} />
            </button>
          )}
        </label>

        <button
          type="button"
          aria-label={filterLabel}
          aria-haspopup="dialog"
          onClick={() => setSheetOpen(true)}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-soft transition-colors duration-200 ease-out hover:text-text focus-visible:shadow-focus focus-visible:outline-none"
        >
          <SlidersIcon
            size={20}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {activeCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-on-primary"
            >
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {TYPE_OPTIONS.map((option) => (
          <Chip
            key={option.label}
            selected={typeFilter === option.value}
            onClick={() => onTypeFilterChange(option.value)}
          >
            {option.label}
          </Chip>
        ))}
      </div>

      <p className="truncate text-caption text-muted">{summary}</p>

      <TransactionFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onReset={resetFilters}
        monthOptions={buildMonthOptions(selectedMonth, currentMonth)}
        selectedMonth={selectedMonth}
        onMonthChange={onMonthChange}
        showOutcome={showOutcome}
        outcomeFilter={outcomeFilter}
        onOutcomeFilterChange={onOutcomeFilterChange}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={onCategoryChange}
        wallets={wallets}
        selectedAccountId={selectedAccountId}
        onAccountChange={onAccountChange}
      />
    </div>
  );
}
