import { SwapCryptocurrency } from '@/features/transaction-list';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Transaction() {
  return (
    <MainLayout>
      <Screen header={<ScreenHeader title="Swap" />}>
        <SwapCryptocurrency />
      </Screen>
    </MainLayout>
  );
}
