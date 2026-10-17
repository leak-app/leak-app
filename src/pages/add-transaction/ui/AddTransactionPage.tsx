import { useState } from 'react';

import type { QuickLogDraftModel } from '@/entities/transaction';
import { AddTransactionForm } from '@/features/add-transaction';
import { QuickLogInput } from '@/features/quick-log';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function AddTransactionPage() {
  const [draft, setDraft] = useState<QuickLogDraftModel>();
  // A new key re-mounts the form so it starts again from the latest draft.
  const [draftVersion, setDraftVersion] = useState(0);

  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Nhập Giao Dịch"
            leftAction={<BackButton />}
          />
        }
        padding={false}
      >
        <div className="pt-3">
          <QuickLogInput
            onDraft={(next) => {
              setDraft(next);
              setDraftVersion((v) => v + 1);
            }}
          />
        </div>
        <AddTransactionForm
          key={draftVersion}
          draft={draft}
        />
      </Screen>
    </MainLayout>
  );
}
