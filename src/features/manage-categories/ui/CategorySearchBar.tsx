import { MagnifyingGlassIcon, XMarkIcon } from '@/shared/icons';

interface CategorySearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CategorySearchBar({
  searchQuery,
  onSearchChange,
}: CategorySearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
        <MagnifyingGlassIcon size={18} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Tìm kiếm danh mục..."
        className="input input-bordered w-full pl-10 pr-10 bg-surface/60 border-outline/20 focus:border-primary focus:outline-none rounded-2xl text-sm transition-all"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Xóa tìm kiếm"
        >
          <XMarkIcon size={18} />
        </button>
      )}
    </div>
  );
}
