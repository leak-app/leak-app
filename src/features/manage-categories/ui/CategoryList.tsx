import type { CategoryModel } from '@/entities/category';
import { CategoryItem } from './CategoryItem';

interface CategoryListProps {
  categories: CategoryModel[];
  isLoading: boolean;
  onEdit: (category: CategoryModel) => void;
  onDelete: (category: CategoryModel) => void;
}

export function CategoryList({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: CategoryListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-16 w-full rounded-2xl bg-surface/40 animate-pulse border border-outline/5"
          />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-12 px-4 text-center rounded-3xl bg-surface/30 border border-dashed border-outline/20 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-surface-bright/60 flex items-center justify-center text-2xl mb-3">
          📂
        </div>
        <p className="text-on-surface-variant font-medium text-sm">
          Chưa có danh mục nào
        </p>
        <p className="text-xs text-on-surface-variant/70 mt-1">
          Nhấn nút &quot;Thêm danh mục&quot; để khởi tạo danh mục mới.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
