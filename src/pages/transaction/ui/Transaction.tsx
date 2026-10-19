import { useState } from 'react';

import type { TransactionModel } from '@/entities/transaction';
import { EditTransactionSheet } from '@/features/edit-transaction';
import { TransactionList } from '@/features/transaction-list';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Transaction() {
  const [editTarget, setEditTarget] = useState<TransactionModel | null>(null);

  return (
    <MainLayout>
      <Screen
        className="pb-28"
        header={<ScreenHeader title="Lịch Sử Giao Dịch" />}
      >
        <TransactionList onEditTransaction={setEditTarget} />
      </Screen>
      <EditTransactionSheet
        transaction={editTarget}
        onClose={() => setEditTarget(null)}
      />
    </MainLayout>
  );
}
