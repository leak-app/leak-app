import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import type { CategoryModel, CategoryType } from '@/entities/category';
import { XMarkIcon } from '@/shared/icons';

const categoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Vui lòng nhập tên danh mục'),
  emoji: z.string().trim().optional(),
  type: z.enum(['INCOME', 'EXPENSE', 'INVESTMENT']),
});

export type CategoryFormValuesModel = z.infer<typeof categoryFormSchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    emoji?: string;
    type: CategoryType;
  }) => Promise<void>;
  initialData?: CategoryModel | null;
  defaultType: CategoryType;
  isSubmitting?: boolean;
}

const COMMON_EMOJIS = [
  '💼',
  '💵',
  '🎁',
  '⏱️',
  '📈',
  '🪙',
  '🍴',
  '🚗',
  '🏠',
  '🎮',
  '🛍️',
  '💸',
  '🏦',
  '🏡',
  '✈️',
  '💊',
  '🎓',
  '⚡',
];

export function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  defaultType,
  isSubmitting = false,
}: CategoryFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm<CategoryFormValuesModel>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      emoji: initialData?.emoji ?? '📁',
      type: initialData?.type ?? defaultType,
    },
  });

  const currentEmoji = useWatch({ control, name: 'emoji' }) || '📁';

  if (!isOpen) return null;

  const handleFormSubmit = async (data: CategoryFormValuesModel) => {
    try {
      await onSubmit({
        name: data.name,
        emoji: data.emoji || '📁',
        type: data.type as CategoryType,
      });
      onClose();
    } catch (err: any) {
      setError('root', {
        message:
          err?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại',
      });
    }
  };

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

        <h3 className="font-bold text-lg text-on-surface mb-4">
          {initialData ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        </h3>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          {errors.root && (
            <div className="p-3 rounded-xl bg-error/15 border border-error/30 text-error text-xs font-semibold">
              {errors.root.message}
            </div>
          )}

          {/* Emoji Selection & Input */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-xs font-bold text-on-surface-variant uppercase">
                Biểu tượng (Emoji)
              </span>
            </label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-bright border border-outline/15 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                {currentEmoji}
              </div>
              <input
                type="text"
                maxLength={4}
                placeholder="Ví dụ: 🍔"
                className="input input-bordered flex-1 bg-surface/60 border-outline/20 rounded-2xl focus:border-primary text-sm"
                {...register('emoji')}
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {COMMON_EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() =>
                    setValue('emoji', em, { shouldValidate: true })
                  }
                  className={`
                    w-8 h-8 rounded-xl text-base flex items-center justify-center transition-all
                    ${
                      currentEmoji === em
                        ? 'bg-primary/20 ring-2 ring-primary scale-110'
                        : 'bg-surface-bright/50 hover:bg-surface-bright hover:scale-105'
                    }
                  `}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-xs font-bold text-on-surface-variant uppercase">
                Tên danh mục <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên danh mục..."
              className="input input-bordered w-full bg-surface/60 border-outline/20 rounded-2xl focus:border-primary text-sm"
              autoFocus
              {...register('name')}
            />
            {errors.name && (
              <span className="text-xs text-error mt-1 px-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Modal Actions */}
          <div className="modal-action mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost rounded-2xl text-on-surface-variant font-semibold text-sm"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-2xl text-on-primary font-bold text-sm min-w-24 shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : initialData ? (
                'Cập nhật'
              ) : (
                'Thêm mới'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
