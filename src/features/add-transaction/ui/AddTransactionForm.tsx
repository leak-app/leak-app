import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Numpad } from '@/shared/ui';

import { EMPTY_CATEGORY_TEXT } from '../lib/deserialize';
import { useAddTransactionForm } from '../model/useAddTransactionForm';
import { CategorySelector } from './CategorySelector';
import { TransactionTypeToggle } from './TransactionTypeToggle';
import { WalletChip } from './WalletChip';
import { WalletPickerSheet } from './WalletPickerSheet';

export function AddTransactionForm() {
  const navigate = useNavigate();
  const form = useAddTransactionForm();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between mt-4">
      <div className="flex flex-col items-center gap-5 px-1">
        <TransactionTypeToggle
          value={form.type}
          onChange={form.setType}
        />

        <div className="flex flex-col items-center select-none">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-mono">
            {form.amountLabel}
          </span>
          <div className="mt-4 flex items-baseline border-b border-outline-variant pb-2 px-6 w-full max-w-[280px] justify-center relative">
            <span className="text-display-currency font-semibold text-primary tabular-nums">
              {form.amountText}
            </span>
            <span className="text-headline-md text-on-surface-variant font-medium ml-1.5">
              đ
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
          </div>
        </div>

        {form.wallets.length > 1 && (
          <WalletChip
            wallet={form.selectedWallet}
            onClick={() => setPickerOpen(true)}
          />
        )}

        <div className="w-full px-2">
          <div className="relative w-full rounded-2xl bg-surface/50 border border-outline/10 px-4 py-3.5 flex items-center gap-3 shadow-inner focus-within:border-primary/30 transition-colors">
            <svg
              className="w-5 h-5 text-on-surface-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            <input
              type="text"
              placeholder="Thêm ghi chú..."
              aria-label="Ghi chú"
              value={form.description}
              onChange={(e) => form.setDescription(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/70 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-6 bg-surface/20 border-t border-outline/5 pt-6 pb-6 rounded-t-[40px]">
        <CategorySelector
          categories={form.categories}
          selectedId={form.activeCategoryId}
          onSelect={form.setCategoryId}
          isLoading={form.categoriesLoading}
          emptyText={EMPTY_CATEGORY_TEXT[form.type]}
        />

        {form.errorText && (
          <div
            role="alert"
            className="px-6 text-center text-xs text-error font-medium"
          >
            {form.errorText}
          </div>
        )}

        <Numpad onKeyPress={form.pressKey} />

        <div className="px-6">
          <button
            type="button"
            onClick={() => form.save(() => navigate(-1))}
            disabled={!form.canSave}
            className="btn btn-primary btn-lg w-full rounded-full"
          >
            {form.isSaving ? 'Đang lưu...' : 'Lưu Giao Dịch'}
          </button>
        </div>
      </div>

      <WalletPickerSheet
        open={pickerOpen}
        wallets={form.wallets}
        selectedId={form.selectedWallet?.id}
        onSelect={form.setWalletId}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
