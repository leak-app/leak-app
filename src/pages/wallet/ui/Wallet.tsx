import { useState } from 'react';

import { ManageWallets } from '@/features/manage-wallets';
import {
  BackButton,
  HeaderPill,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';
import { Plus } from 'lucide-react';

export default function Wallet() {
  const [addRequested, setAddRequested] = useState(0);
  return (
    <MainLayout>
      <Screen
        header={
          <ScreenHeader
            title="Ví & tài khoản"
            leftAction={<BackButton />}
            rightAction={
              <HeaderPill onClick={() => setAddRequested((n) => n + 1)}>
                <Plus
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Thêm ví
              </HeaderPill>
            }
          />
        }
      >
        <ManageWallets addRequested={addRequested} />
      </Screen>
    </MainLayout>
  );
}
