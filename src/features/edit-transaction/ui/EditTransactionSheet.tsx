import type { TransactionModel } from '@/entities/transaction';
import { BottomSheet } from '@/shared/ui';

import { EditTransactionForm } from './EditTransactionForm';

interface EditTransactionSheetProps {
  /** The transaction being edited; the sheet is open while it is set. */
  transaction: TransactionModel | null;
  onClose: () => void;
}

/** Fixes a wrong amount, type, category, wallet, day or note on a saved transaction. */
export function EditTransactionSheet({
  transaction,
  onClose,
}: EditTransactionSheetProps) {
  return (
    <BottomSheet
      open={transaction !== null}
      onClose={onClose}
      title="Chỉnh sửa giao dịch"
      size="tall"
    >
      {/* Keyed so the form restarts when another transaction is opened. */}
      {transaction && (
        <EditTransactionForm
          key={transaction.id}
          transaction={transaction}
          onDone={onClose}
        />
      )}
    </BottomSheet>
  );
}
