import type { CategoryModel } from '@/entities/category';
import { XMarkIcon } from '@/shared/icons';

interface CategoryDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  category: CategoryModel | null;
  isDeleting?: boolean;
}

export function CategoryDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  category,
  isDeleting = false,
}: CategoryDeleteModalProps) {
  if (!isOpen || !category) return null;

  return (
    <div className="modal modal-open z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="modal-box max-w-md w-full bg-surface border border-outline/15 rounded-3xl p-6 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
        >
          <XMarkIcon size={18} />
        </button>

        <div className="flex items-center gap-3 text-error mb-2">
          <div className="w-10 h-10 rounded-full bg-error/15 flex items-center justify-center text-error">
            ⚠️
          </div>
          <h3 className="font-bold text-lg text-on-surface">
            Xác nhận xóa danh mục
          </h3>
        </div>

        <div className="my-4 p-3.5 rounded-2xl bg-surface-bright/70 border border-outline/10 flex items-center gap-3">
          <span className="text-2xl">{category.emoji}</span>
          <div className="flex flex-col">
            <span className="font-bold text-on-surface text-sm">
              {category.name}
            </span>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          Bạn có chắc chắn muốn xóa danh mục này? Nếu danh mục đã có giao dịch
          phát sinh, hệ thống sẽ tự động chuyển sang chế độ{' '}
          <strong>ẩn (soft delete)</strong> để bảo toàn dữ liệu lịch sử.
        </p>

        <div className="modal-action mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost rounded-2xl text-on-surface-variant font-semibold text-sm"
            disabled={isDeleting}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-error rounded-2xl text-white font-bold text-sm min-w-24 shadow-md"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              'Xóa danh mục'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
