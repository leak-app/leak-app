import {
  GoogleSheetsSyncCard,
  SheetsReturnAlert,
} from '@/features/sync-google-sheets';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function ProfileSync() {
  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Đồng bộ dữ liệu"
            leftAction={<BackButton />}
          />
        }
      >
        <div className="flex flex-col gap-5 pb-8">
          <SheetsReturnAlert />
          <GoogleSheetsSyncCard />
        </div>
      </Screen>
    </MainLayout>
  );
}
