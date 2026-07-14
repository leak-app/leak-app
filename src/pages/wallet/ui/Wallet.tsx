import { WalletList } from '@/features/wallet-list';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Wallet() {
  return (
    <MainLayout>
      <Screen header={<ScreenHeader title="Wallet" />}>
        <WalletList />
      </Screen>
    </MainLayout>
  );
}
