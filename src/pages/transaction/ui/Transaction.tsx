import { TransactionList } from '@/features/transaction-list';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Transaction() {
  return (
    <MainLayout>
      <Screen
        className="pb-28"
        header={<ScreenHeader title="Lịch Sử Giao Dịch" />}
      >
        <TransactionList />
      </Screen>
    </MainLayout>
  );
}
