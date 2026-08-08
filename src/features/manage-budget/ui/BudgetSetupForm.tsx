import { useBudgets, useUpsertBudget } from '@/entities/budget';
import { useCategories } from '@/entities/category';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  month: number;
  year: number;
}

export const BudgetSetupForm = ({ month, year }: Props) => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories('EXPENSE');
  const { data: budgets = [], isLoading: isBudgetsLoading } = useBudgets(
    month,
    year
  );
  const { mutateAsync: upsertBudget, isPending: isSaving } = useUpsertBudget();

  // Local state map for input amounts { [categoryId]: amountNumber }
  const [budgetInputs, setBudgetInputs] = useState<Record<string, number>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (budgets.length > 0) {
      const initialMap: Record<string, number> = {};
      budgets.forEach((b) => {
        initialMap[b.categoryId] = b.amount;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBudgetInputs(initialMap);
    }
  }, [budgets]);

  const handleInputChange = (categoryId: string, value: string) => {
    const num = parseFloat(value.replace(/[^0-9]/g, '')) || 0;
    setBudgetInputs((prev) => ({
      ...prev,
      [categoryId]: num,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);

    try {
      // Upsert budget for each category that has a configured value
      const promises = categories.map((cat) => {
        const amount = budgetInputs[cat.id] ?? 0;
        return upsertBudget({
          categoryId: cat.id,
          amount,
          month,
          year,
        });
      });

      await Promise.all(promises);
      setSaveSuccess(true);

      setTimeout(() => {
        navigate(`/budget?month=${month}&year=${year}`);
      }, 1000);
    } catch (err) {
      console.error('Failed to save budgets', err);
    }
  };

  if (isCategoriesLoading || isBudgetsLoading) {
    return (
      <div className="flex justify-center p-12">
        <span
          aria-label="Đang tải dữ liệu"
          className="loading loading-spinner loading-lg text-primary"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {saveSuccess && (
        <div className="alert alert-success shadow-lg rounded-2xl text-white">
          <span>
            ✓ Đã lưu thay đổi ngân sách thành công! Đang chuyển hướng...
          </span>
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl border border-outline/10 space-y-4 shadow-xl">
        <div className="flex justify-between items-center pb-3 border-b border-outline/10">
          <h2 className="text-lg font-bold text-on-surface">
            Danh mục chi tiêu
          </h2>
          <span className="text-xs text-on-surface-variant">Đơn vị: VNĐ</span>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-on-surface-variant py-4 text-center">
            Chưa có danh mục chi tiêu nào. Hãy thêm danh mục trong phần Quản lý
            danh mục.
          </p>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => {
              const currentVal = budgetInputs[cat.id] ?? 0;
              const formattedDisplay =
                currentVal > 0 ? currentVal.toLocaleString('vi-VN') : '';

              return (
                <div
                  key={cat.id}
                  className="flex flex-col justify-between gap-3 p-3 bg-surface-container-high/40 rounded-md border border-outline/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-lg shrink-0">
                      {cat.emoji ? cat.emoji : '🏷️'}
                    </div>
                    <span className="font-semibold text-on-surface text-sm">
                      {cat.name}
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="0"
                      value={formattedDisplay}
                      onChange={(e) =>
                        handleInputChange(cat.id, e.target.value)
                      }
                      className="input input-sm input-bordered w-full text-right bg-surface-container text-on-surface font-semibold focus:border-primary rounded-xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(`/budget?month=${month}&year=${year}`)}
          className="btn btn-ghost rounded-xl text-on-surface-variant hover:text-on-surface flex-1/2"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="btn btn-primary rounded-xl px-6 text-on-primary font-bold shadow-md shadow-primary/30 flex-1/2"
        >
          {isSaving ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            'Lưu ngân sách'
          )}
        </button>
      </div>
    </form>
  );
};
