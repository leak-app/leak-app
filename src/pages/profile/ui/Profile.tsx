import { Navigate, useLocation } from 'react-router-dom';

import { parseSheetsReturn } from '@/features/sync-google-sheets';
import {
  LogoutButton,
  ProfileSettingsList,
  UserIdentity,
} from '@/features/user-profile';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Profile() {
  const { search } = useLocation();

  // The API sends the Google consent result here; the sync screen shows it.
  if (parseSheetsReturn(search)) {
    return (
      <Navigate
        to={`/profile/sync${search}`}
        replace
      />
    );
  }

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
          <UserIdentity />
          <ProfileSettingsList />
          <LogoutButton />
        </div>
      </Screen>
    </MainLayout>
  );
}
