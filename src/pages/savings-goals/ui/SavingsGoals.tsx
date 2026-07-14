import { SavingsGoalsList } from '@/features/savings-goals-list';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function SavingsGoals() {
  return (
    <MainLayout>
      <Screen header={<ScreenHeader title="Savings Goals" />}>
        <SavingsGoalsList />
      </Screen>
    </MainLayout>
  );
}
