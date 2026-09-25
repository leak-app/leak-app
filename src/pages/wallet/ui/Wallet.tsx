import { useState } from 'react';

import { ManageWallets } from '@/features/manage-wallets';
import { PlusIcon } from '@/shared/icons';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

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
              <button
                type="button"
                onClick={() => setAddRequested((n) => n + 1)}
                className="btn btn-primary btn-sm min-h-11 gap-1"
              >
                <PlusIcon size={16} />
                Thêm ví
              </button>
            }
          />
        }
      >
        <ManageWallets addRequested={addRequested} />
      </Screen>
    </MainLayout>
  );
}
