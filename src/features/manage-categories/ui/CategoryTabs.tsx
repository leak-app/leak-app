import type { CategoryType } from '@/entities/category';

interface CategoryTabsProps {
  activeTab: CategoryType;
  onTabChange: (tab: CategoryType) => void;
  counts?: Record<CategoryType, number>;
}

export function CategoryTabs({
  activeTab,
  onTabChange,
  counts,
}: CategoryTabsProps) {
  const tabs: { type: CategoryType; label: string }[] = [
    { type: 'INCOME', label: 'Thu nhập' },
    { type: 'EXPENSE', label: 'Chi tiêu' },
    { type: 'INVESTMENT', label: 'Đầu tư' },
  ];

  return (
    <div className="w-full">
      <div className="tabs tabs-boxed bg-surface/80 p-1.5 rounded-2xl border border-outline/10 grid grid-cols-3 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.type;
          const count = counts ? counts[tab.type] : undefined;

          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => onTabChange(tab.type)}
              className={`
                tab h-10 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5
                ${
                  isActive
                    ? 'tab-active bg-primary text-on-primary shadow-md font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50'
                }
              `}
            >
              <span>{tab.label}</span>
              {count !== undefined && (
                <span
                  className={`
                    badge badge-xs border-0 px-1.5 font-bold text-[0.625rem]
                    ${
                      isActive
                        ? 'bg-on-primary/20 text-on-primary'
                        : 'bg-surface-bright text-on-surface-variant'
                    }
                  `}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
