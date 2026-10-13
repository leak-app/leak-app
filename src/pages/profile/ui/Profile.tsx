import {
  GoogleSheetsSyncCard,
  SheetsReturnAlert,
} from '@/features/sync-google-sheets';
import { UserProfile } from '@/features/user-profile';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Profile() {
  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Hồ sơ cá nhân"
            leftAction={<BackButton />}
          />
        }
      >
        <UserProfile />
        <div className="mt-6 flex flex-col gap-3 pb-6">
          <SheetsReturnAlert />
          <GoogleSheetsSyncCard />
        </div>
      </Screen>
    </MainLayout>
  );
}
