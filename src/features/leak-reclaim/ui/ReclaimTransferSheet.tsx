import type { GoalModel } from '@/entities/goal';
import { BottomSheet } from '@/shared/ui';

import { useReclaimTransfer } from '../model/useReclaimTransfer';

interface Props {
  open: boolean;
  goals: GoalModel[];
  defaultGoalId: string | null;
  defaultAmount: number;
  onClose: () => void;
  onDone: (successText: string) => void;
}

export function ReclaimTransferSheet({ open, onClose, ...rest }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Chuyển vào mục tiêu"
    >
      <TransferForm {...rest} />
    </BottomSheet>
  );
}

function TransferForm({
  goals,
  defaultGoalId,
  defaultAmount,
  onDone,
}: Omit<Props, 'open' | 'onClose'>) {
  const f = useReclaimTransfer(goals, defaultGoalId, defaultAmount, onDone);
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        f.submit();
      }}
    >
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Mục tiêu
        </span>
        <select
          className="select w-full"
          value={f.goalId}
          onChange={(e) => f.setGoalId(e.target.value)}
        >
          {f.goals.map((g) => (
            <option
              key={g.id}
              value={g.id}
            >
              {g.emoji} {g.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Số tiền
        </span>
        <input
          className="input w-full text-lg tabular-nums"
          inputMode="numeric"
          value={f.amountText}
          onChange={(e) => f.setAmount(e.target.value)}
        />
      </label>
      {f.wallets.length > 1 && (
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-on-surface-variant">
            Lấy từ ví
          </span>
          <select
            className="select w-full"
            value={f.wallet?.id ?? ''}
            onChange={(e) => f.setWalletId(e.target.value)}
          >
            {f.wallets.map((w) => (
              <option
                key={w.id}
                value={w.id}
              >
                {w.name} · {w.compactBalanceText}
              </option>
            ))}
          </select>
        </label>
      )}
      {f.errorText && (
        <div
          role="alert"
          className="alert alert-error alert-soft text-xs"
        >
          {f.errorText}
        </div>
      )}
      <button
        type="submit"
        disabled={!f.canSubmit}
        className="btn btn-primary min-h-11"
      >
        {f.isSaving ? 'Đang chuyển...' : 'Xác nhận chuyển'}
      </button>
    </form>
  );
}
