import { useState } from 'react';

import { ManageGoals } from '@/features/manage-goals';
import { PlusIcon } from '@/shared/icons';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function SavingsGoals() {
  const [addRequested, setAddRequested] = useState(0);
  return (
    <MainLayout>
      <Screen
        header={
          <ScreenHeader
            title="Mục tiêu tiết kiệm"
            leftAction={<BackButton />}
            rightAction={
              <button
                type="button"
                onClick={() => setAddRequested((n) => n + 1)}
                className="btn btn-primary btn-sm min-h-11 gap-1"
              >
                <PlusIcon size={16} />
                Thêm mục tiêu
              </button>
            }
          />
        }
      >
        <ManageGoals addRequested={addRequested} />
      </Screen>
    </MainLayout>
  );
}
