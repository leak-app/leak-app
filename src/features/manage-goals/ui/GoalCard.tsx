import type { CSSProperties } from 'react';

import type { GoalModel } from '@/entities/goal';

interface Props {
  goal: GoalModel;
  onDeposit: (goal: GoalModel) => void;
  onWithdraw: (goal: GoalModel) => void;
  onOpen: (goal: GoalModel) => void;
}

export function GoalCard({ goal, onDeposit, onWithdraw, onOpen }: Props) {
  const hint = [goal.targetDateText, goal.paceText].filter(Boolean).join(' · ');
  return (
    <article className="card bg-surface/80 border border-outline/10 rounded-3xl p-4 gap-4">
      <button
        type="button"
        onClick={() => onOpen(goal)}
        className="flex items-center gap-4 text-left min-h-11"
      >
        <div
          className="radial-progress text-primary text-xs font-bold shrink-0"
          style={
            { '--value': goal.percent, '--size': '3.5rem' } as CSSProperties
          }
          role="progressbar"
          aria-valuenow={goal.percent}
          aria-label={goal.percentText}
        >
          {goal.percentText}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-bold text-on-surface line-clamp-1">
            {goal.emoji} {goal.name}
          </span>
          <span className="text-xs text-on-surface-variant tabular-nums">
            {goal.savedText} / {goal.targetText}
          </span>
          {goal.isCompleted ? (
            <span className="badge badge-success badge-soft badge-sm mt-1">
              Đã hoàn thành
            </span>
          ) : (
            hint && (
              <span className="text-xs text-on-surface-variant mt-1">
                {hint}
              </span>
            )
          )}
        </div>
      </button>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm flex-1 min-h-11"
          onClick={() => onDeposit(goal)}
        >
          Nạp
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm flex-1 min-h-11"
          disabled={goal.savedAmount <= 0}
          onClick={() => onWithdraw(goal)}
        >
          Rút
        </button>
      </div>
    </article>
  );
}
