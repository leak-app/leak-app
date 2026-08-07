import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
  type CategoryModel,
  type CategoryType,
} from '@/entities/category';
import { PlusIcon } from '@/shared/icons';
import { useMemo, useState } from 'react';
import { CategoryDeleteModal } from './CategoryDeleteModal';
import { CategoryFormModal } from './CategoryFormModal';
import { CategoryList } from './CategoryList';
import { CategorySearchBar } from './CategorySearchBar';
import { CategoryTabs } from './CategoryTabs';

export function ManageCategories() {
  const [activeTab, setActiveTab] = useState<CategoryType>('EXPENSE');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryModel | null>(
    null
  );
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryModel | null>(null);

  // Queries & Mutations
  const { data: categories = [], isLoading } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Category counts per type
  const counts = useMemo(() => {
    const res: Record<CategoryType, number> = {
      INCOME: 0,
      EXPENSE: 0,
      INVESTMENT: 0,
    };
    categories.forEach((cat) => {
      if (res[cat.type] !== undefined) {
        res[cat.type] += 1;
      }
    });
    return res;
  }, [categories]);

  // Filter categories by active tab and search query
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesTab = cat.type === activeTab;
      const matchesSearch =
        !searchQuery.trim() ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesTab && matchesSearch;
    });
  }, [categories, activeTab, searchQuery]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (category: CategoryModel) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (category: CategoryModel) => {
    setDeletingCategory(category);
  };

  const handleFormSubmit = async (formData: {
    name: string;
    emoji?: string;
    type: CategoryType;
  }) => {
    if (editingCategory) {
      await updateCategoryMutation.mutateAsync({
        id: editingCategory.id,
        ...formData,
      });
    } else {
      await createCategoryMutation.mutateAsync(formData);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;
    await deleteCategoryMutation.mutateAsync(deletingCategory.id);
    setDeletingCategory(null);
  };

  return (
    <div className="flex-1 flex flex-col gap-5 py-2">
      {/* Category Type Tabs */}
      <CategoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Controls: Search Bar & Add Button */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1">
          <CategorySearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="btn btn-primary rounded-2xl h-11 px-4 text-on-primary font-bold text-sm shadow-md flex items-center gap-1.5 shrink-0"
        >
          <PlusIcon size={18} />
          <span className="hidden sm:inline">Thêm danh mục</span>
          <span className="sm:hidden">Thêm</span>
        </button>
      </div>

      {/* Category List */}
      <div className="flex-1 min-h-[300px]">
        <CategoryList
          categories={filteredCategories}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </div>

      {/* Add / Edit Form Modal */}
      <CategoryFormModal
        key={
          editingCategory
            ? editingCategory.id
            : isFormModalOpen
              ? `new-${activeTab}`
              : 'closed'
        }
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCategory}
        defaultType={activeTab}
        isSubmitting={
          createCategoryMutation.isPending || updateCategoryMutation.isPending
        }
      />

      {/* Confirm Delete Modal */}
      <CategoryDeleteModal
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        category={deletingCategory}
        isDeleting={deleteCategoryMutation.isPending}
      />
    </div>
  );
}
