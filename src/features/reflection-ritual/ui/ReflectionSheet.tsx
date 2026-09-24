import type { TransactionModel } from '@/entities/transaction';
import { BottomSheet } from '@/shared/ui';

import { ReflectionSession } from './ReflectionSession';

interface ReflectionSheetProps {
  items: TransactionModel[];
  open: boolean;
  onClose: () => void;
}

export function ReflectionSheet({
  items,
  open,
  onClose,
}: ReflectionSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Nhìn lại chi tiêu"
    >
      <ReflectionSession
        items={items}
        onClose={onClose}
      />
    </BottomSheet>
  );
}
