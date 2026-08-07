import { useAuth } from '@/app/providers';
import { UserDropdown } from '@/entities/user';
import { ReportOverview } from '@/features/report-overview';
import { BellIcon } from '@/shared/icons';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Overview() {
  const { user } = useAuth();

  const leftHeaderAction = (
    <div className="flex items-center gap-3">
      <UserDropdown />
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold text-on-surface leading-tight">
          {user?.name || 'User'}
        </span>
        <span className="text-xs text-on-surface-variant font-mono truncate max-w-[140px]">
          {user?.email}
        </span>
      </div>
    </div>
  );

  const rightHeaderAction = (
    <button
      type="button"
      className="relative w-10 h-10 rounded-full bg-surface-bright/50 border border-outline/10 flex items-center justify-center text-on-surface hover:bg-surface-bright transition-all group"
    >
      <BellIcon size={20} />
      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error animate-pulse" />
    </button>
  );

  return (
    <MainLayout>
      <Screen
        className="pb-28"
        header={
          <ScreenHeader
            leftAction={leftHeaderAction}
            rightAction={rightHeaderAction}
          />
        }
      >
        <ReportOverview />
      </Screen>
    </MainLayout>
  );
}
