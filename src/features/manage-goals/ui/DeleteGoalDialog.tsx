import { useDeleteGoal, type GoalModel } from '@/entities/goal';
import { getApiErrorMessage } from '@/shared/api';
import { BottomSheet } from '@/shared/ui';

interface Props {
  goal: GoalModel | null;
  onClose: () => void;
}

export function DeleteGoalDialog({ goal, onClose }: Props) {
  const del = useDeleteGoal();
  const close = () => {
    del.reset();
    onClose();
  };
  return (
    <BottomSheet
      open={!!goal}
      onClose={close}
      title={goal ? `Xóa mục tiêu ${goal.name}?` : undefined}
    >
      {del.isError && (
        <div
          role="alert"
          className="alert alert-error alert-soft text-xs mb-3"
        >
          {getApiErrorMessage(del.error, 'Không xóa được mục tiêu.')}
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-ghost flex-1 min-h-11"
          onClick={close}
        >
          Hủy
        </button>
        <button
          type="button"
          disabled={del.isPending}
          className="btn btn-error flex-1 min-h-11"
          onClick={() => goal && del.mutate(goal.id, { onSuccess: close })}
        >
          Xóa
        </button>
      </div>
    </BottomSheet>
  );
}
