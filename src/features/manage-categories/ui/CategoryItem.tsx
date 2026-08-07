import { useState } from 'react';

import type { CategoryModel } from '@/entities/category';
import { useSwipeToDelete } from '@/shared/hooks';
import { PencilIcon, TrashIcon, XMarkIcon } from '@/shared/icons';

interface CategoryItemProps {
  category: CategoryModel;
  onEdit: (category: CategoryModel) => void;
  onDelete: (category: CategoryModel) => void;
}

export function CategoryItem({
  category,
  onEdit,
  onDelete,
}: CategoryItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { offsetX, isDragging, swipeProgress, touchProps } = useSwipeToDelete({
    onSwipeDelete: () => onDelete(category),
  });

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl select-none touch-pan-y">
        {/* Swipe Left Background Action */}
        <div
          className={`
            absolute inset-0 bg-error/20 border border-error/30 rounded-2xl flex items-center justify-end px-5 gap-2 transition-opacity duration-150
            ${offsetX < 0 ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="flex items-center gap-2 text-error font-bold text-sm transition-transform duration-75"
            style={{
              transform: `scale(${0.8 + swipeProgress * 0.2})`,
            }}
          >
            <span>Xóa danh mục</span>
            <TrashIcon size={20} />
          </div>
        </div>

        {/* Foreground Card */}
        <div
          {...touchProps}
          onClick={() => setIsMenuOpen(true)}
          style={{
            transform: `translateX(${offsetX}px)`,
            transition: isDragging ? 'none' : 'transform 0.25s ease-out',
          }}
          className="group flex items-center justify-between p-3.5 bg-surface border border-outline/10 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing relative"
        >
          <div className="flex items-center gap-3 min-w-0 pointer-events-none">
            <div className="w-11 h-11 rounded-2xl bg-surface-bright border border-outline/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
              {category.emoji}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-on-surface truncate">
                  {category.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Long Press Context Menu Modal */}
      {isMenuOpen && (
        <div className="modal modal-open z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="modal-box max-w-sm w-full bg-surface border border-outline/15 rounded-3xl p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-on-surface-variant hover:text-on-surface"
            >
              <XMarkIcon size={18} />
            </button>

            {/* Category Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-outline/10 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-bright border border-outline/10 flex items-center justify-center text-2xl shrink-0">
                {category.emoji}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-on-surface text-base truncate">
                  {category.name}
                </span>
                <span className="text-xs text-on-surface-variant">
                  Tùy chọn danh mục
                </span>
              </div>
            </div>

            {/* Actions Menu List */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit(category);
                }}
                className="btn btn-ghost w-full justify-start gap-3 rounded-2xl h-12 text-on-surface hover:bg-primary/10 hover:text-primary transition-colors text-sm font-semibold"
              >
                <PencilIcon size={18} />
                <span>Chỉnh sửa danh mục</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(category);
                }}
                className="btn btn-ghost w-full justify-start gap-3 rounded-2xl h-12 text-error hover:bg-error/15 transition-colors text-sm font-semibold"
              >
                <TrashIcon size={18} />
                <span>Xóa danh mục</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-outline border-outline/20 w-full rounded-2xl mt-2 text-on-surface-variant font-medium text-sm"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
