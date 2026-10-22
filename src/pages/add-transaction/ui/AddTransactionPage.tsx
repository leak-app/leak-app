import { useState } from 'react';

import type { QuickLogDraftModel } from '@/entities/transaction';
import { AddTransactionForm } from '@/features/add-transaction';
import { QuickLogInput } from '@/features/quick-log';
import { SparklesIcon } from '@/shared/icons';
import {
  BackButton,
  HeaderIconButton,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';

export default function AddTransactionPage() {
  const [draft, setDraft] = useState<QuickLogDraftModel>();
  // A new key re-mounts the form so it starts again from the latest draft.
  const [draftVersion, setDraftVersion] = useState(0);
  const [quickLogOpen, setQuickLogOpen] = useState(false);

  // Unmounting a focused field would leave the keyboard state behind, so let go of focus first.
  const releaseFocus = () =>
    (document.activeElement as HTMLElement | null)?.blur();

  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Nhập Giao Dịch"
            leftAction={<BackButton />}
            rightAction={
              <HeaderIconButton
                icon={SparklesIcon}
                label="Nhập nhanh bằng câu chữ"
                expanded={quickLogOpen}
                onClick={() => {
                  releaseFocus();
                  setQuickLogOpen((open) => !open);
                }}
              />
            }
          />
        }
        padding={false}
      >
        {quickLogOpen && (
          <div className="pt-3">
            <QuickLogInput
              autoFocus
              onDraft={(next) => {
                setDraft(next);
                setDraftVersion((v) => v + 1);
                // The text is parsed: close the box so the filled form and number pad show.
                releaseFocus();
                setQuickLogOpen(false);
              }}
            />
          </div>
        )}
        <AddTransactionForm
          key={draftVersion}
          draft={draft}
        />
      </Screen>
    </MainLayout>
  );
}
