import { useGoalContributions, type GoalModel } from '@/entities/goal';
import { BottomSheet } from '@/shared/ui';

interface Props {
  goal: GoalModel | null;
  onEdit: (goal: GoalModel) => void;
  onDelete: (goal: GoalModel) => void;
  onClose: () => void;
}

export function GoalHistorySheet({ goal, onEdit, onDelete, onClose }: Props) {
  const { data: items = [], isLoading } = useGoalContributions(
    goal?.id ?? null
  );
  return (
    <BottomSheet
      open={!!goal}
      onClose={onClose}
      title={goal ? `${goal.emoji} ${goal.name}` : undefined}
    >
      {goal && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-ghost btn-sm flex-1 min-h-11"
              onClick={() => onEdit(goal)}
            >
              Sửa
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm flex-1 min-h-11 text-error"
              onClick={() => onDelete(goal)}
            >
              Xóa
            </button>
          </div>
          <h4 className="text-xs font-bold text-on-surface-variant uppercase">
            Lịch sử
          </h4>
          {isLoading ? (
            <div className="skeleton h-12 rounded-xl" />
          ) : items.length === 0 ? (
            <p className="text-sm text-on-surface-variant">
              Chưa có giao dịch nào cho mục tiêu này.
            </p>
          ) : (
            <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {items.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex flex-col">
                    <span className="font-semibold text-on-surface">
                      {c.typeLabel}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {[c.dateText, c.walletName].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  <span className="tabular-nums text-on-surface">
                    {c.amountText}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </BottomSheet>
  );
}
