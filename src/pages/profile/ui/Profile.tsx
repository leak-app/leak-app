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
      </Screen>
    </MainLayout>
  );
}
