import type { GoalModel } from '@/entities/goal';
import { BottomSheet, Select } from '@/shared/ui';

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
      <Select
        label="Mục tiêu"
        value={f.goalId}
        options={f.goals.map((g) => ({
          value: g.id,
          label: `${g.emoji} ${g.name}`,
        }))}
        onChange={f.setGoalId}
      />
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
        <Select
          label="Lấy từ ví"
          value={f.wallet?.id ?? ''}
          options={f.wallets.map((w) => ({
            value: w.id,
            label: `${w.name} · ${w.compactBalanceText}`,
          }))}
          onChange={f.setWalletId}
        />
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
