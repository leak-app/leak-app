import type { GoalModel } from '@/entities/goal';
import { BottomSheet } from '@/shared/ui';

import { GOAL_EMOJIS } from '../lib/emojis';
import { useGoalForm } from '../model/useGoalForm';

interface Props {
  open: boolean;
  editing: GoalModel | null;
  onClose: () => void;
}

export function GoalFormSheet({ open, editing, onClose }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={editing ? 'Sửa mục tiêu' : 'Mục tiêu mới'}
    >
      {/* Keyed so the form resets when switching between goals. */}
      <GoalForm
        key={editing?.id ?? 'new'}
        editing={editing}
        onDone={onClose}
      />
    </BottomSheet>
  );
}

function GoalForm({
  editing,
  onDone,
}: {
  editing: GoalModel | null;
  onDone: () => void;
}) {
  const f = useGoalForm(editing, onDone);
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        f.submit();
      }}
    >
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Biểu tượng"
      >
        {GOAL_EMOJIS.map((em) => (
          <button
            key={em}
            type="button"
            role="radio"
            aria-checked={f.emoji === em}
            onClick={() => f.setEmoji(em)}
            className="btn btn-ghost btn-square min-h-11 min-w-11 text-xl aria-checked:btn-active"
          >
            {em}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Tên mục tiêu
        </span>
        <input
          className="input w-full"
          maxLength={60}
          value={f.name}
          onChange={(e) => f.setName(e.target.value)}
          placeholder="VD: Du lịch Nhật Bản"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Số tiền mục tiêu
        </span>
        <input
          className="input w-full tabular-nums"
          inputMode="numeric"
          value={f.targetText}
          onChange={(e) => f.setTarget(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Hạn (không bắt buộc)
        </span>
        <input
          type="month"
          className="input w-full"
          value={f.month}
          onChange={(e) => f.setMonth(e.target.value)}
        />
      </label>
      {f.errorText && (
        <div
          role="alert"
          className="alert alert-error alert-soft text-xs"
        >
          {f.errorText}
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-ghost flex-1 min-h-11"
          onClick={onDone}
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={f.isSaving}
          className="btn btn-primary flex-1 min-h-11"
        >
          {f.isSaving ? 'Đang lưu...' : 'Lưu'}
        </button>
      </div>
    </form>
  );
}
