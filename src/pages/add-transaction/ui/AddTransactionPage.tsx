import { AddTransactionForm } from '@/features/add-transaction';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function AddTransactionPage() {
  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Nhập Giao Dịch"
            leftAction={<BackButton />}
          />
        }
        padding={false}
      >
        <AddTransactionForm />
      </Screen>
    </MainLayout>
  );
}
