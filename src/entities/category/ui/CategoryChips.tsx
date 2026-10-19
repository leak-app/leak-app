import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import type { CategoryModel } from '../model/types';

interface Props {
  categories: CategoryModel[];
  selectedId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
  emptyText: string;
  /** The quick-log draft left the category open: mark the choices. */
  highlight?: boolean;
  /** No side padding, for a container that already has its own. */
  flush?: boolean;
}

function Wrapper({
  children,
  flush,
}: {
  children: React.ReactNode;
  flush: boolean;
}) {
  return (
    <div
      className={clsx(
        'w-full overflow-x-auto no-scrollbar scroll-smooth select-none',
        !flush && 'px-6'
      )}
    >
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

export function CategoryChips({
  categories,
  selectedId,
  onSelect,
  isLoading,
  emptyText,
  highlight = false,
  flush = false,
}: Props) {
  if (isLoading) {
    return (
      <Wrapper flush={flush}>
        <span className="text-xs text-on-surface-variant animate-pulse py-2">
          Đang tải danh mục...
        </span>
      </Wrapper>
    );
  }

  if (categories.length === 0) {
    return (
      <Wrapper flush={flush}>
        <span className="text-xs text-on-surface-variant py-2">
          {emptyText}
        </span>
        <Link
          to="/categories"
          className="btn btn-ghost btn-sm min-h-11 text-primary"
        >
          Tạo danh mục
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper flush={flush}>
      {categories.map((cat: CategoryModel) => {
        const isSelected = selectedId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={clsx(
              'px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold transition-all border whitespace-nowrap active:scale-95 duration-200',
              isSelected
                ? 'bg-primary/10 border-primary text-primary shadow-[0_0_0.75rem] shadow-primary/10'
                : highlight
                  ? 'bg-surface border-dashed border-primary/60 text-on-surface-variant hover:bg-surface-bright'
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
