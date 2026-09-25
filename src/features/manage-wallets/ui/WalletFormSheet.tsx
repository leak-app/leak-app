import { WALLET_TYPE_LABELS, type WalletModel } from '@/entities/wallet';
import { BottomSheet } from '@/shared/ui';

import { useWalletForm } from '../model/useWalletForm';

interface Props {
  open: boolean;
  editing: WalletModel | null;
  onClose: () => void;
}

export function WalletFormSheet({ open, editing, onClose }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={editing ? 'Sửa ví' : 'Thêm ví'}
    >
      {/* Keyed so the form resets when switching between wallets. */}
      <WalletForm
        key={editing?.id ?? 'new'}
        editing={editing}
        onDone={onClose}
      />
    </BottomSheet>
  );
}

function WalletForm({
  editing,
  onDone,
}: {
  editing: WalletModel | null;
  onDone: () => void;
}) {
  const form = useWalletForm(editing, onDone);
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Tên ví
        </span>
        <input
          className="input w-full"
          value={form.name}
          maxLength={50}
          onChange={(e) => form.setName(e.target.value)}
          placeholder="VD: Techcombank"
        />
      </label>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Loại ví
        </span>
        {editing ? (
          <span className="badge badge-ghost">{editing.typeLabel}</span>
        ) : (
          <div
            className="join"
            role="radiogroup"
            aria-label="Loại ví"
          >
            {(['LIQUID', 'INVESTMENT'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={form.type === t}
                onClick={() => form.setType(t)}
                className="join-item btn btn-sm min-h-11 btn-ghost aria-checked:btn-primary"
              >
                {WALLET_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        )}
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-on-surface-variant">
          Số dư ban đầu
        </span>
        <div className="join w-full">
          <button
            type="button"
            aria-pressed={form.negative}
            aria-label="Số âm"
            onClick={form.toggleNegative}
            className="join-item btn min-h-11 min-w-11 aria-pressed:btn-secondary"
          >
            −
          </button>
          <input
            className="join-item input w-full tabular-nums"
            inputMode="numeric"
            value={form.amountText}
            onChange={(e) => form.setAmount(e.target.value)}
          />
        </div>
        <span className="text-xs text-on-surface-variant">
          {editing
            ? `Số dư hiện tại: ${editing.balanceText}. Số dư hiện tại sẽ thay đổi tương ứng.`
            : 'Số tiền đang có trong ví lúc bắt đầu theo dõi.'}
        </span>
      </label>

      {form.errorText && (
        <div
          role="alert"
          className="alert alert-error alert-soft text-xs"
        >
          {form.errorText}
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
          disabled={form.isSaving}
          className="btn btn-primary flex-1 min-h-11"
        >
          {form.isSaving ? 'Đang lưu...' : 'Lưu'}
        </button>
      </div>
    </form>
  );
}
