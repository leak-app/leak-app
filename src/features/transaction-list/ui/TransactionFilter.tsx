import type { CategoryModel } from '@/entities/category';
import {
  OUTCOME_FILTER_OPTIONS,
  type SpendOutcome,
  type TransactionType,
} from '@/entities/transaction';
import type { WalletModel } from '@/entities/wallet';
import { MagnifyingGlassIcon, XMarkIcon } from '@/shared/icons';
import { Select, type SelectOption } from '@/shared/ui';

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
  const categoryOptions: SelectOption<string>[] = [
    { value: '', label: 'Tất cả danh mục' },
    ...categories.map((cat) => ({
      value: cat.id,
      label: `${cat.emoji} ${cat.name}`,
    })),
  ];
  const walletOptions: SelectOption<string>[] = [
    { value: '', label: 'Tất cả ví' },
    ...wallets.map((wallet) => ({ value: wallet.id, label: wallet.name })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <label className="input input-bordered rounded-full w-full flex items-center gap-2">
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
            onClick={() => onSearchChange('')}
            className="btn btn-ghost btn-circle btn-xs text-on-surface-variant hover:text-on-surface"
          >
            <XMarkIcon size={16} />
          </button>
        )}
      </label>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => onTypeFilterChange(undefined)}
          className={`btn btn-sm rounded-full font-semibold transition-all whitespace-nowrap ${
            typeFilter === undefined
              ? 'btn-primary'
              : 'bg-surface border-outline/10 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          ⚡ Tất cả
        </button>
        <button
          type="button"
          onClick={() => onTypeFilterChange('EXPENSE')}
          className={`btn btn-sm rounded-full font-semibold transition-all whitespace-nowrap ${
            typeFilter === 'EXPENSE'
              ? 'btn-primary'
              : 'bg-surface border-outline/10 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Chi tiêu
        </button>
        <button
          type="button"
          onClick={() => onTypeFilterChange('INCOME')}
          className={`btn btn-sm rounded-full font-semibold transition-all whitespace-nowrap ${
            typeFilter === 'INCOME'
              ? 'btn-primary'
              : 'bg-surface border-outline/10 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Thu nhập
        </button>
      </div>

      {typeFilter !== 'INCOME' && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {OUTCOME_FILTER_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={outcomeFilter === option.value}
              onClick={() => onOutcomeFilterChange(option.value)}
              className="btn btn-sm min-h-11 rounded-full font-semibold whitespace-nowrap transition-all bg-surface border-outline/10 text-on-surface-variant hover:text-on-surface aria-pressed:btn-secondary aria-pressed:text-on-secondary"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 w-full">
        <div className="flex-1 bg-surface border border-outline/10 rounded-2xl px-3 py-1 flex items-center justify-between">
          <span className="text-xs text-on-surface-variant font-medium shrink-0">
            Tháng:
          </span>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="input input-ghost input-xs font-semibold text-primary focus:bg-transparent cursor-pointer"
          />
        </div>

        <Select
          variant="pill"
          className="flex-1"
          ariaLabel="Lọc theo danh mục"
          value={selectedCategoryId}
          options={categoryOptions}
          onChange={onCategoryChange}
        />

        {wallets.length > 1 && (
          <Select
            variant="pill"
            className="flex-1"
            ariaLabel="Lọc theo ví"
            value={selectedAccountId}
            options={walletOptions}
            onChange={onAccountChange}
          />
        )}
      </div>
    </div>
  );
}
