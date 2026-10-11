import { useState } from 'react';

import { ManageWallets } from '@/features/manage-wallets';
import { PlusIcon } from '@/shared/icons';
import {
  BackButton,
  HeaderPill,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';

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
                <PlusIcon
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
