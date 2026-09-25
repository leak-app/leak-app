import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCategories } from '@/entities/category';
import {
  parseSpendOutcome,
  useInfiniteTransactions,
  type SpendOutcome,
  type TransactionModel,
  type TransactionType,
} from '@/entities/transaction';
import { useWallets } from '@/entities/wallet';

import { GroupedTransactionList } from './GroupedTransactionList';
import { OutcomeReviewSheet } from './OutcomeReviewSheet';
import { TransactionFilter } from './TransactionFilter';

export function TransactionList() {
  // Filter States
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | undefined>();

  // categoryId, accountId, outcome and month live in the URL so other pages can deep-link here.
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('categoryId') ?? '';
  const selectedAccountId = searchParams.get('accountId') ?? '';
  const outcomeFilter = parseSpendOutcome(searchParams.get('outcome'));
  const monthParam = searchParams.get('month');
  const selectedMonth =
    monthParam === 'all' ? '' : (monthParam ?? dayjs().format('YYYY-MM'));

  const updateParam = (key: string, value?: string) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );

  const setSelectedCategoryId = (id: string) =>
    updateParam('categoryId', id || undefined);
  const setSelectedAccountId = (id: string) =>
    updateParam('accountId', id || undefined);
  const setOutcomeFilter = (outcome?: SpendOutcome) =>
    updateParam('outcome', outcome);
  // An emptied month input means "all time"; store it explicitly so the default doesn't return.
  const setSelectedMonth = (month: string) =>
    updateParam('month', month || 'all');

  const [reviewTarget, setReviewTarget] = useState<TransactionModel | null>(
    null
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
  const { data: wallets = [] } = useWallets();

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
    accountId: selectedAccountId || undefined,
    outcome: typeFilter === 'INCOME' ? undefined : outcomeFilter,
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
        onOutcomeClick={setReviewTarget}
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
        outcomeFilter={outcomeFilter}
        onOutcomeFilterChange={setOutcomeFilter}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        categories={categories}
        selectedAccountId={selectedAccountId}
        onAccountChange={setSelectedAccountId}
        wallets={wallets}
      />

      {renderContent()}

      <OutcomeReviewSheet
        transaction={reviewTarget}
        onClose={() => setReviewTarget(null)}
      />
    </div>
  );
}
