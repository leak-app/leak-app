import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWallets } from '@/entities/wallet';
import { InvestmentOverview } from '@/features/investment-overview';
import { BalanceUpdateSheet } from '@/features/update-balance';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';
import { BalanceToggleButton } from '@/shared/ui';

export default function Investment() {
  const { data: wallets = [] } = useWallets();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const updating = wallets.find((wallet) => wallet.id === updatingId) ?? null;

  return (
    <MainLayout mist="lavender">
      <Screen
        className="pb-28"
        header={
          <ScreenHeader
            title="Đầu tư"
            leftAction={<BackButton />}
            rightAction={<BalanceToggleButton />}
          />
        }
      >
        <InvestmentOverview
          onUpdateBalance={setUpdatingId}
          onAddFunds={(walletId) =>
            navigate(`/transfer?to=${encodeURIComponent(walletId)}`)
          }
          onTransfer={() => navigate('/transfer')}
        />
        <BalanceUpdateSheet
          wallet={updating}
          onClose={() => setUpdatingId(null)}
        />
      </Screen>
    </MainLayout>
  );
}
