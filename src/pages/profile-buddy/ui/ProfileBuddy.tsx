import { BuddySettingsCard } from '@/features/buddy-settings';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function ProfileBuddy() {
  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Bạn thân AI"
            leftAction={<BackButton />}
          />
        }
      >
        <div className="flex flex-col gap-5 pb-8">
          <BuddySettingsCard />
        </div>
      </Screen>
    </MainLayout>
  );
}
