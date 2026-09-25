import { useState } from 'react';

import { summarizeGoals, useGoals, type GoalModel } from '@/entities/goal';

import type { MovementKind } from '../model/useMovementForm';
import { DeleteGoalDialog } from './DeleteGoalDialog';
import { GoalCard } from './GoalCard';
import { GoalFormSheet } from './GoalFormSheet';
import { GoalHistorySheet } from './GoalHistorySheet';
import { GoalMovementSheet } from './GoalMovementSheet';
import { GoalsSummaryCard } from './GoalsSummaryCard';

export function ManageGoals({ addRequested }: { addRequested: number }) {
  const { data: goals = [], isLoading, isError, refetch } = useGoals();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<GoalModel | null>(null);
  const [moving, setMoving] = useState<{
    goal: GoalModel;
    kind: MovementKind;
  } | null>(null);
  const [viewing, setViewing] = useState<GoalModel | null>(null);
  const [deleting, setDeleting] = useState<GoalModel | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  // The page's "Thêm mục tiêu" button bumps addRequested; react to the change
  // during render (https://react.dev/learn/you-might-not-need-an-effect).
  const [seenAddRequest, setSeenAddRequest] = useState(addRequested);
  if (addRequested !== seenAddRequest) {
    setSeenAddRequest(addRequested);
    openCreate();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="skeleton h-32 rounded-3xl" />
        <div className="skeleton h-36 rounded-3xl" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="card bg-surface border border-outline/10 p-6 mt-4 items-center gap-3">
        <span className="text-sm text-on-surface">Không tải được mục tiêu</span>
        <button
          type="button"
          className="btn btn-primary btn-sm min-h-11"
          onClick={() => refetch()}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4 pb-28">
      {goals.length === 0 ? (
        <div className="card bg-surface border border-outline/10 rounded-3xl p-6 items-center text-center gap-3">
          <span
            className="text-4xl"
            aria-hidden="true"
          >
            🎯
          </span>
          <p className="text-sm text-on-surface">
            Đặt mục tiêu đầu tiên, ví dụ quỹ khẩn cấp 3 tháng chi tiêu.
          </p>
          <button
            type="button"
            className="btn btn-primary min-h-11"
            onClick={openCreate}
          >
            Tạo mục tiêu
          </button>
        </div>
      ) : (
        <>
          <GoalsSummaryCard summary={summarizeGoals(goals)} />
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              goal={g}
              onOpen={setViewing}
              onDeposit={(goal) => setMoving({ goal, kind: 'deposit' })}
              onWithdraw={(goal) => setMoving({ goal, kind: 'withdraw' })}
            />
          ))}
        </>
      )}

      <GoalFormSheet
        open={formOpen}
        editing={editing}
        onClose={() => setFormOpen(false)}
      />
      <GoalMovementSheet
        target={moving}
        onClose={() => setMoving(null)}
      />
      <GoalHistorySheet
        goal={viewing}
        onClose={() => setViewing(null)}
        onEdit={(g) => {
          setViewing(null);
          setEditing(g);
          setFormOpen(true);
        }}
        onDelete={(g) => {
          setViewing(null);
          setDeleting(g);
        }}
      />
      <DeleteGoalDialog
        goal={deleting}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
