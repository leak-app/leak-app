import { useNavigate } from 'react-router-dom';

import { UserProfile } from '@/features/user-profile';
import { ArrowLeftIcon } from '@/shared/icons';
import { MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function Profile() {
  const navigate = useNavigate();

  const leftHeaderAction = (
    <button
      onClick={() => navigate(-1)}
      className="w-10 h-10 rounded-2xl bg-surface border border-outline/10 flex items-center justify-center text-on-surface hover:bg-surface-bright transition-all active:scale-95 group"
    >
      <ArrowLeftIcon
        size={18}
        className="group-hover:-translate-x-0.5 transition-transform"
      />
    </button>
  );

  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="My Profile"
            leftAction={leftHeaderAction}
          />
        }
      >
        <UserProfile />
      </Screen>
    </MainLayout>
  );
}
