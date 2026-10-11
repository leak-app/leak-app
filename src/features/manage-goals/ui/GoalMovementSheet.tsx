import type { GoalModel } from '@/entities/goal';
import { BottomSheet, Select } from '@/shared/ui';

import { useMovementForm, type MovementKind } from '../model/useMovementForm';

interface Props {
  target: { goal: GoalModel; kind: MovementKind } | null;
  onClose: () => void;
}

const TITLES: Record<MovementKind, string> = {
  deposit: 'Nạp tiền vào',
  withdraw: 'Rút tiền từ',
};
const WALLET_LABELS: Record<MovementKind, string> = {
  deposit: 'Lấy từ ví',
  withdraw: 'Chuyển về ví',
};
const SUBMIT_LABELS: Record<MovementKind, string> = {
  deposit: 'Nạp tiền',
  withdraw: 'Rút tiền',
};

export function GoalMovementSheet({ target, onClose }: Props) {
  return (
    <BottomSheet
      open={!!target}
      onClose={onClose}
      title={target ? `${TITLES[target.kind]} ${target.goal.name}` : undefined}
    >
      {target && (
        <MovementForm
          key={`${target.goal.id}-${target.kind}`}
          goal={target.goal}
          kind={target.kind}
          onDone={onClose}
        />
      )}
    </BottomSheet>
  );
}

function MovementForm({
  goal,
  kind,
  onDone,
}: {
  goal: GoalModel;
  kind: MovementKind;
  onDone: () => void;
}) {
  const f = useMovementForm(goal, kind, onDone);
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
          Số tiền
        </span>
        <input
          className="input w-full text-lg tabular-nums"
          inputMode="numeric"
          value={f.amountText}
          onChange={(e) => f.setAmount(e.target.value)}
        />
      </label>
      {kind === 'withdraw' && (
        <button
          type="button"
          className="btn btn-ghost btn-sm self-start min-h-11"
          onClick={f.fillAll}
        >
          Rút hết ({goal.savedText})
        </button>
      )}
      {f.wallets.length > 1 && (
        <Select
          label={WALLET_LABELS[kind]}
          value={f.wallet?.id ?? ''}
          options={f.wallets.map((w) => ({
            value: w.id,
            label: `${w.name} · ${w.compactBalanceText}`,
          }))}
          onChange={f.setWalletId}
        />
      )}
      {f.warningText && <p className="text-xs text-warning">{f.warningText}</p>}
      {f.overWithdrawText && (
        <p className="text-xs text-error">{f.overWithdrawText}</p>
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
        {f.isSaving ? 'Đang xử lý...' : SUBMIT_LABELS[kind]}
      </button>
    </form>
  );
}
