import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useCategories } from '@/entities/category';
import {
  useInfiniteTransactions,
  type TransactionType,
} from '@/entities/transaction';

import { GroupedTransactionList } from './GroupedTransactionList';
import { TransactionFilter } from './TransactionFilter';

export function TransactionList() {
  // Filter States
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | undefined>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format('YYYY-MM')
  );

  // Compute Start and End Date for current month filter
  const { startDate, endDate } = useMemo(() => {
    if (!selectedMonth) return { startDate: undefined, endDate: undefined };
    const monthObj = dayjs(selectedMonth, 'YYYY-MM');
    return {
      startDate: monthObj.startOf('month').toISOString(),
      endDate: monthObj.endOf('month').toISOString(),
    };
  }, [selectedMonth]);

  // Load Categories for Filter Dropdown
  const { data: categories = [] } = useCategories();

  // Fetch Infinite Transactions
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteTransactions({
    search: search.trim() || undefined,
    type: typeFilter,
    categoryId: selectedCategoryId || undefined,
    startDate,
    endDate,
    limit: 15,
  });

  // Flat array of all loaded transactions
  const allTransactions = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // IntersectionObserver for Infinite Scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-3 py-12 items-center justify-center text-on-surface-variant">
          <span className="loading loading-spinner loading-md text-primary"></span>
          <span className="text-xs font-medium">
            Đang tải lịch sử giao dịch...
          </span>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="py-12 text-center text-error text-sm">
          Không thể tải dữ liệu giao dịch. Vui lòng thử lại sau.
        </div>
      );
    }

    if (allTransactions.length === 0) {
      return (
        <div className="py-16 flex flex-col items-center justify-center text-center text-on-surface-variant">
          <span className="text-sm font-medium">Không tìm thấy giao dịch</span>
          <span className="text-xs mt-1 text-on-surface-variant">
            Thử thay đổi bộ lọc hoặc tìm kiếm khác
          </span>
        </div>
      );
    }

    return (
      <GroupedTransactionList
        transactions={allTransactions}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onFetchNextPage={fetchNextPage}
        loadMoreRef={loadMoreRef}
      />
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 select-none">
      <TransactionFilter
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        categories={categories}
      />

      {renderContent()}
    </div>
  );
}
