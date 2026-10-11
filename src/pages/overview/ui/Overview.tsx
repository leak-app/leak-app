import { CategoryLeakCard } from '@/features/category-leak-rate';
import { ReclaimOfferCard } from '@/features/leak-reclaim';
import { ReflectionBanner } from '@/features/reflection-ritual';
import { ReportOverview } from '@/features/report-overview';
import {
  HeaderIconButton,
  MainLayout,
  Screen,
  ScreenHeader,
} from '@/shared/layout';
import { formatLongDate, greetingForHour } from '@/shared/lib';
import { Settings } from 'lucide-react';

export default function Overview() {
  const now = new Date();
  const eyebrow = formatLongDate(now);
  const greeting = greetingForHour(now.getHours());

  return (
    <MainLayout>
      <Screen
        className="pb-28"
        header={
          <ScreenHeader
            eyebrow={eyebrow}
            title={greeting}
            rightAction={
              <HeaderIconButton
                icon={Settings}
                label="Cài đặt"
                to="/profile"
              />
            }
          />
        }
      >
        <div className="flex flex-col gap-4">
          <ReflectionBanner />
          <ReclaimOfferCard />
          <ReportOverview insightsSlot={<CategoryLeakCard />} />
        </div>
      </Screen>
    </MainLayout>
  );
}
