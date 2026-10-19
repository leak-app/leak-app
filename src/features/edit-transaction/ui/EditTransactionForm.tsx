import { useState } from 'react';

import { CategoryChips, EMPTY_CATEGORY_TEXT } from '@/entities/category';
import {
  TransactionTypeToggle,
  type TransactionModel,
} from '@/entities/transaction';
import { WalletChip, WalletPickerSheet } from '@/entities/wallet';
import {
  AmountField,
  Button,
  Card,
  DateChips,
  Input,
  Numpad,
} from '@/shared/ui';

import { useEditTransactionForm } from '../model/useEditTransactionForm';

interface EditTransactionFormProps {
  transaction: TransactionModel;
  onDone: () => void;
}

export function EditTransactionForm({
  transaction,
  onDone,
}: EditTransactionFormProps) {
  const form = useEditTransactionForm(transaction, onDone);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    // Not a <form>: the date and wallet pickers are sheets that render their own
    // <form method="dialog"> backdrop, and forms cannot nest.
    <div className="flex min-h-full flex-col gap-4">
      <TransactionTypeToggle
        value={form.type}
        onChange={form.setType}
      />

      <AmountField
        label="Số tiền"
        value={form.amountText}
        onValueChange={form.setAmountText}
        // The numpad replaces the phone keyboard; a physical keyboard still types.
        inputMode="none"
      />

      {form.canPickWallet && (
        <WalletChip
          name={form.walletName}
          onClick={() => setPickerOpen(true)}
        />
      )}

      <div className="flex flex-col gap-2">
        <span className="text-label text-muted">Ngày thực hiện</span>
        <DateChips
          label="Ngày thực hiện"
          value={form.occurredOn}
          choice={form.dateChoice}
          onChange={form.setOccurredOn}
        />
      </div>

      <Input
        label="Ghi chú"
        placeholder="Thêm ghi chú..."
        value={form.note}
        onChange={(event) => form.setNote(event.target.value)}
      />

      <div className="flex flex-col gap-2">
        <span className="text-label text-muted">Danh mục</span>
        <CategoryChips
          categories={form.categories}
          selectedId={form.categoryId}
          onSelect={form.setCategoryId}
          isLoading={form.categoriesLoading}
          emptyText={EMPTY_CATEGORY_TEXT[form.type]}
          flush
        />
      </div>

      {form.errorText && (
        <Card
          variant="danger"
          role="alert"
          className="text-description text-text"
        >
          {form.errorText}
        </Card>
      )}

      <Numpad
        onKeyPress={form.pressKey}
        className="mt-auto !px-0"
      />

      {/* Pinned, so Save stays in reach while the numpad scrolls underneath. */}
      <div className="sticky bottom-0 z-10 flex gap-2.5 border-t border-border bg-sheet pt-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onDone}
        >
          Hủy
        </Button>
        <Button
          size="lg"
          className="flex-1"
          loading={form.isSaving}
          disabled={!form.canSave}
          onClick={form.save}
        >
          Lưu thay đổi
        </Button>
      </div>

      <WalletPickerSheet
        open={pickerOpen}
        wallets={form.wallets}
        selectedId={form.walletId}
        onSelect={form.setWalletId}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
