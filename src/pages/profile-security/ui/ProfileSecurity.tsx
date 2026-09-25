import { RevokeOthersButton, SessionList } from '@/features/manage-sessions';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function ProfileSecurity() {
  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Bảo mật"
            leftAction={<BackButton />}
          />
        }
      >
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Phiên đăng nhập
          </h2>
          <SessionList />
          <RevokeOthersButton />
        </div>
      </Screen>
    </MainLayout>
  );
}
