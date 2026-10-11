import { useState } from 'react';

import { ManageGoals } from '@/features/manage-goals';
import {
  BackButton,
  HeaderPill,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';
import { Plus } from 'lucide-react';

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
              <HeaderPill onClick={() => setAddRequested((n) => n + 1)}>
                <Plus
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Thêm mục tiêu
              </HeaderPill>
            }
          />
        }
      >
        <ManageGoals addRequested={addRequested} />
      </Screen>
    </MainLayout>
  );
}
