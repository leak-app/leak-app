import { useState } from 'react';

import { useWallets, type WalletModel } from '@/entities/wallet';
import { getApiErrorMessage } from '@/shared/api';
import { ArrowUpDownIcon, ICON, InfoIcon } from '@/shared/icons';
import { formatAmountInput, parseAmountInput } from '@/shared/lib';
import {
  AmountField,
  Button,
  Card,
  Chip,
  Input,
  Select,
  type SelectOption,
} from '@/shared/ui';

import { useCreateTransfer } from '../api/transfers.api';
import {
  addToAmount,
  pickTransferDefaults,
  validateTransfer,
} from '../lib/transfer';

export interface TransferPreset {
  fromId?: string;
  toId?: string;
}

const QUICK_AMOUNTS = [
  { label: '+1tr', value: 1_000_000 },
  { label: '+2tr', value: 2_000_000 },
  { label: '+5tr', value: 5_000_000 },
];

interface TransferFormProps {
  /** The wallets the form starts with; each side is picked for the user when missing. */
  preset: TransferPreset;
  /** Called after the transfer is saved, and when the user cancels. */
  onDone: () => void;
}

/** Moves money from one wallet to another, for example cash into an investment wallet. */
export function TransferForm({ preset, onDone }: TransferFormProps) {
  const { data: wallets, isLoading } = useWallets();

  // The starting wallets are picked once, so wait until the list is there.
  if (isLoading || !wallets) {
    return (
      <div className="flex justify-center py-10">
        <span
          className="loading loading-spinner loading-md text-primary"
          aria-label="Đang tải"
        />
      </div>
    );
  }
  return (
    <TransferFormBody
      wallets={wallets}
      preset={preset}
      onDone={onDone}
    />
  );
}

function TransferFormBody({
  wallets,
  preset,
  onDone,
}: {
  wallets: WalletModel[];
  preset: TransferPreset;
  onDone: () => void;
}) {
  const defaults = pickTransferDefaults(wallets, preset);
  const [fromId, setFromId] = useState(defaults.fromId);
  const [toId, setToId] = useState(defaults.toId);
  const [amountText, setAmountText] = useState('');
  const [note, setNote] = useState('');
  const [validation, setValidation] = useState<string | null>(null);
  const mutation = useCreateTransfer();

  const options: SelectOption<string>[] = wallets.map((wallet) => ({
    value: wallet.id,
    label: wallet.name,
    meta: wallet.compactBalanceText,
  }));
  const amount = parseAmountInput(amountText);
  const absolute = amount === null ? null : Math.abs(amount);

  const setAmount = (text: string) => {
    const parsed = parseAmountInput(text);
    setAmountText(parsed === null ? '' : formatAmountInput(Math.abs(parsed)));
  };

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const submit = () => {
    const problem = validateTransfer({ fromId, toId, amount: absolute });
    setValidation(problem);
    if (problem || absolute === null) return;
    mutation.mutate(
      {
        fromAccountId: fromId,
        toAccountId: toId,
        amount: absolute,
        note: note.trim() || undefined,
      },
      { onSuccess: onDone }
    );
  };

  const errorText =
    validation ??
    (mutation.error
      ? getApiErrorMessage(
          mutation.error,
          'Không chuyển được tiền. Vui lòng thử lại.'
        )
      : null);

  return (
    <form
      className="flex flex-1 flex-col gap-4 pb-6"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="relative flex flex-col gap-2">
        <Select
          variant="tile"
          label="Từ ví"
          value={fromId}
          options={options}
          onChange={setFromId}
        />
        <button
          type="button"
          onClick={swap}
          aria-label="Đổi chiều chuyển tiền"
          className="absolute top-1/2 left-1/2 z-10 flex size-touch -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-sheet text-primary focus-visible:shadow-focus focus-visible:outline-none"
        >
          <ArrowUpDownIcon
            size={ICON.size.row}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </button>
        <Select
          variant="tile"
          label="Đến ví"
          value={toId}
          options={options}
          onChange={setToId}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <AmountField
          label="Số tiền"
          value={amountText}
          onValueChange={setAmount}
          autoFocus
        />
        <div className="flex gap-2">
          {QUICK_AMOUNTS.map((quick) => (
            <Chip
              key={quick.label}
              compact
              selected={false}
              onClick={() =>
                setAmount(String(addToAmount(absolute, quick.value)))
              }
            >
              {quick.label}
            </Chip>
          ))}
        </div>
      </div>

      <Input
        label="Ghi chú (không bắt buộc)"
        maxLength={120}
        placeholder="Ví dụ: mua thêm chứng chỉ quỹ"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />

      <div className="flex items-start gap-2.5 rounded-tile bg-white/4 px-3.5 py-3">
        <InfoIcon
          size={17}
          strokeWidth={ICON.stroke.active}
          className="mt-px shrink-0 text-secondary"
          aria-hidden="true"
        />
        <span className="text-label leading-normal font-normal text-soft">
          Không phải chi tiêu, không phải lãi — chỉ là tiền chuyển chỗ. Ngân
          sách không bị ảnh hưởng.
        </span>
      </div>

      {errorText && (
        <Card
          variant="danger"
          role="alert"
          className="text-description text-text"
        >
          {errorText}
        </Card>
      )}

      <div className="mt-auto flex gap-2.5">
        <Button
          type="button"
          variant="ghost"
          onClick={onDone}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          loading={mutation.isPending}
        >
          {absolute ? `Chuyển ${amountText}₫` : 'Chuyển tiền'}
        </Button>
      </div>
    </form>
  );
}
