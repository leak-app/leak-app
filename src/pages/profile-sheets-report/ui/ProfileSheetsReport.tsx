import {
  REPORT_GUIDE_COPY,
  ReportScriptGuide,
} from '@/features/sync-google-sheets';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function ProfileSheetsReport() {
  return (
    <MainLayout
      showBottomNav={false}
      mist="lavender"
    >
      <Screen
        header={
          <ScreenHeader
            title={REPORT_GUIDE_COPY.title}
            leftAction={<BackButton />}
            rightAction={
              <span className="inline-flex h-6.5 items-center rounded-full bg-secondary-tint px-2.75 text-xs font-semibold text-secondary">
                {REPORT_GUIDE_COPY.badge}
              </span>
            }
          />
        }
      >
        <div className="pb-8">
          <ReportScriptGuide />
        </div>
      </Screen>
    </MainLayout>
  );
}
