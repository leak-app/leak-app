import { BottomSheet } from '@/shared/ui';

import type { BudgetQuickEdit } from '../model/useBudgetQuickEdit';

export function BudgetQuickEditSheet({ edit }: { edit: BudgetQuickEdit }) {
  const t = edit.target;
  return (
    <BottomSheet
      open={!!t}
      onClose={edit.close}
      title={t?.titleText}
    >
      {t && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            edit.save();
          }}
        >
          <div className="flex justify-between text-xs text-on-surface-variant">
            <span>{t.monthText}</span>
            <span className="tabular-nums">{t.spentText}</span>
          </div>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-on-surface-variant">
              Hạn mức
            </span>
            <input
              className="input w-full text-lg tabular-nums"
              inputMode="numeric"
              value={edit.amountText}
              onChange={(e) => edit.setAmount(e.target.value)}
            />
          </label>
          {t.chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {t.chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="btn btn-sm btn-ghost min-h-11 rounded-full"
                  onClick={() => edit.applyChip(chip.amount)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}
          {edit.errorText && (
            <div
              role="alert"
              className="alert alert-error alert-soft text-xs"
            >
              {edit.errorText}
            </div>
          )}
          <button
            type="submit"
            disabled={!edit.canSave}
            className="btn btn-primary min-h-11"
          >
            {edit.isSaving ? 'Đang lưu...' : 'Lưu'}
          </button>
          {t.budgetId && (
            <button
              type="button"
              disabled={!edit.canClear}
              className="btn btn-ghost text-error min-h-11"
              onClick={edit.clear}
            >
              Bỏ ngân sách
            </button>
          )}
        </form>
      )}
    </BottomSheet>
  );
}
