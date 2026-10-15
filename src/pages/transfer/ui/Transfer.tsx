import { useNavigate, useSearchParams } from 'react-router-dom';

import { TransferForm } from '@/features/transfer-funds';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

/**
 * Moves money between two wallets. `?to=` or `?from=` sets the wallet that is
 * already known, for example the investment wallet that is being topped up.
 */
export default function Transfer() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const toId = params.get('to') ?? undefined;
  const fromId = params.get('from') ?? undefined;

  return (
    <MainLayout
      mist="lavender"
      showBottomNav={false}
    >
      <Screen
        header={
          <ScreenHeader
            title={toId ? 'Nạp thêm tiền' : 'Chuyển tiền'}
            leftAction={<BackButton />}
          />
        }
      >
        <TransferForm
          preset={{ fromId, toId }}
          onDone={() => navigate(-1)}
        />
      </Screen>
    </MainLayout>
  );
}
