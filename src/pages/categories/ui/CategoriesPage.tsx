import { ManageCategories } from '@/features/manage-categories';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';

export default function CategoriesPage() {
  return (
    <MainLayout showBottomNav={false}>
      <Screen
        header={
          <ScreenHeader
            title="Quản lý danh mục"
            leftAction={<BackButton />}
          />
        }
      >
        <ManageCategories />
      </Screen>
    </MainLayout>
  );
}
