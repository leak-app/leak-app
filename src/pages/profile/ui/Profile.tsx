import {
  GoogleSheetsSyncCard,
  SheetsReturnAlert,
} from '@/features/sync-google-sheets';
import {
  LogoutButton,
  ProfileSettingsList,
  UserIdentity,
} from '@/features/user-profile';
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
        <div className="flex flex-col gap-5 pb-8">
          <SheetsReturnAlert />
          <UserIdentity />
          <GoogleSheetsSyncCard />
          <ProfileSettingsList />
          <LogoutButton />
        </div>
      </Screen>
    </MainLayout>
  );
}
