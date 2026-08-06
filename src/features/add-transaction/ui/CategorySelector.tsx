import { clsx } from 'clsx';

import type { CategoryModel } from '@/entities/category';

interface Props {
  categories: CategoryModel[];
  selectedId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar scroll-smooth px-6 select-none">
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

export function CategorySelector({
  categories,
  selectedId,
  onSelect,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <Wrapper>
        <span className="text-xs text-on-surface-variant animate-pulse py-2">
          Đang tải danh mục...
        </span>
      </Wrapper>
    );
  }

  if (categories.length === 0) {
    return (
      <Wrapper>
        <span className="text-xs text-on-surface-variant py-2">
          Không tìm thấy danh mục chi tiêu
        </span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {categories.map((cat: CategoryModel) => {
        const isSelected = selectedId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={clsx(
              'px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold transition-all border whitespace-nowrap active:scale-95 duration-200',
              isSelected
                ? 'bg-primary/10 border-primary text-primary shadow-[0_0_12px] shadow-primary/10'
                : 'bg-surface border-outline/10 text-on-surface-variant hover:bg-surface-bright'
            )}
          >
            {cat.emoji && <span className="text-base">{cat.emoji}</span>}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </Wrapper>
  );
}
