import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { WalletModel } from '@/entities/wallet';
import { ManageWallets } from '@/features/manage-wallets';
import { BalanceUpdateSheet } from '@/features/update-balance';
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
  const navigate = useNavigate();
  const [updatingBalance, setUpdatingBalance] = useState<WalletModel | null>(
    null
  );
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
        <ManageWallets
          addRequested={addRequested}
          onUpdateBalance={setUpdatingBalance}
          onTransfer={(wallet) =>
            navigate(
              wallet
                ? `/transfer?from=${encodeURIComponent(wallet.id)}`
                : '/transfer'
            )
          }
        />
        <BalanceUpdateSheet
          wallet={updatingBalance}
          onClose={() => setUpdatingBalance(null)}
        />
      </Screen>
    </MainLayout>
  );
}
