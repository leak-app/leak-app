import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCategories } from '@/entities/category';
import { useAddTransaction } from '@/entities/transaction';
import { Numpad } from '@/shared/ui';
import { CategorySelector } from './CategorySelector';

export function AddTransactionForm() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const { data: categories = [], isLoading } = useCategories('EXPENSE');
  const { mutate: addTransaction, isPending, error } = useAddTransaction();

  const activeCategoryId = selectedCategoryId || categories[0]?.id || '';

  const handleKeyPress = (key: string) => {
    if (key === 'Backspace') {
      setAmount((prev) => {
        if (prev.length <= 1) return '0';
        return prev.slice(0, -1);
      });
    } else if (key === '.000') {
      setAmount((prev) => {
        if (prev === '0') return '0';
        return prev + '000';
      });
    } else {
      setAmount((prev) => {
        if (prev === '0') {
          if (key === '0') return '0';
          return key;
        }
        // Cap at 12 digits (999.999.999.999) to prevent overflow
        if (prev.length >= 12) return prev;
        return prev + key;
      });
    }
  };

  const numericAmount = parseInt(amount, 10) || 0;
  const formattedAmount = new Intl.NumberFormat('vi-VN').format(numericAmount);

  const handleSave = () => {
    if (numericAmount <= 0 || !activeCategoryId) return;

    addTransaction(
      {
        amount: numericAmount,
        type: 'EXPENSE',
        categoryId: activeCategoryId,
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-between mt-4">
      <div className="flex flex-col items-center gap-6 px-1">
        <div className="flex flex-col items-center select-none">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-mono">
            SỐ TIỀN CHI TIÊU
          </span>
          <div className="mt-4 flex items-baseline border-b border-outline-variant pb-2 px-6 w-full max-w-[280px] justify-center relative">
            <span className="text-display-currency font-semibold text-primary">
              {formattedAmount}
            </span>
            <span className="text-headline-md text-on-surface-variant font-medium ml-1.5">
              đ
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
          </div>
        </div>

        <div className="w-full px-2">
          <div className="relative w-full rounded-2xl bg-surface/50 border border-outline/10 px-4 py-3.5 flex items-center gap-3 shadow-inner focus-within:border-primary/30 transition-colors">
            <svg
              className="w-5 h-5 text-on-surface-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/70 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-6 bg-surface/20 border-t border-outline/5 pt-6 pb-6 rounded-t-[40px]">
        <CategorySelector
          categories={categories}
          selectedId={activeCategoryId}
          onSelect={setSelectedCategoryId}
          isLoading={isLoading}
        />

        {error && (
          <div className="px-6 text-center text-xs text-error font-medium">
            {error.message || 'Lưu giao dịch thất bại. Vui lòng thử lại.'}
          </div>
        )}

        <Numpad onKeyPress={handleKeyPress} />

        <div className="px-6">
          <button
            onClick={handleSave}
            disabled={isPending || numericAmount === 0 || !activeCategoryId}
            className="btn btn-primary btn-lg w-full rounded-full"
          >
            {isPending ? 'Đang lưu...' : 'Lưu Giao Dịch'}
          </button>
        </div>
      </div>
    </div>
  );
}
