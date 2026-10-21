import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';

import {
  apiClient,
  type BaseResponseModel,
  type PagingResponseModel,
} from '@/shared/api';

import { deserialize } from '../lib/deserialize';
import { useBuddyWatch } from '../model/buddyWatch';
import type {
  CreateTransactionParamsModel,
  GetTransactionsQueryParamsModel,
  QuickLogDraftModel,
  TransactionListResponseModel,
  TransactionModel,
  UpdateTransactionParamsModel,
} from '../model/types';
import { REFLECTION_QUEUE_KEY } from './outcomes.api';

/**
 * Everything computed from transactions. A change to a transaction must refresh
 * all of it: lists, wallet balances, reports, the leak rate, budgets and reclaim.
 */
export function invalidateTransactionQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ['transactions'] });
  queryClient.invalidateQueries({ queryKey: ['leak-rate'] });
  queryClient.invalidateQueries({ queryKey: REFLECTION_QUEUE_KEY });
  queryClient.invalidateQueries({ queryKey: ['wallets'] });
  queryClient.invalidateQueries({ queryKey: ['report-overview'] });
  queryClient.invalidateQueries({ queryKey: ['reclaim-offer'] });
  queryClient.invalidateQueries({ queryKey: ['budgets'] });
  queryClient.invalidateQueries({ queryKey: ['budget-report'] });
}

/** Only the history list: a comment arrived, nothing else changed. */
export function refreshTransactionList(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ['transactions'] });
}

export function useInfiniteTransactions(
  params: Omit<GetTransactionsQueryParamsModel, 'page'> = {}
) {
  return useInfiniteQuery<PagingResponseModel<TransactionModel>, Error>({
    queryKey: ['transactions', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient
        .get<BaseResponseModel<TransactionListResponseModel>>('/transactions', {
          params: {
            ...params,
            page: pageParam,
            limit: params.limit || 15,
          },
        })
        .then((res) => res.data);

      if (!response.data) {
        return {
          data: [],
          meta: { total: 0, page: 1, limit: 15, totalPages: 0 },
        } as PagingResponseModel<TransactionModel>;
      }

      return {
        data: response.data.transactions.map(deserialize),
        meta: response.data.meta,
      } as PagingResponseModel<TransactionModel>;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponseModel<TransactionModel>,
    Error,
    CreateTransactionParamsModel
  >({
    mutationFn: async (params) => {
      return apiClient
        .post<BaseResponseModel<TransactionModel>>('/transactions', params)
        .then((res) => res.data);
    },
    onSuccess: (response) => {
      invalidateTransactionQueries(queryClient);
      if (response.data?.type === 'EXPENSE') {
        useBuddyWatch.getState().startWatching(response.data.id);
      }
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation<TransactionModel, Error, UpdateTransactionParamsModel>({
    mutationFn: async ({ id, ...changes }) => {
      const response = await apiClient
        .patch<BaseResponseModel<TransactionModel>>(
          `/transactions/${id}`,
          changes
        )
        .then((res) => res.data);
      if (!response.data) throw new Error('Empty update response');
      return deserialize(response.data);
    },
    onSuccess: () => invalidateTransactionQueries(queryClient),
    // A 404 means it was deleted elsewhere: show the list as it really is.
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ['transactions'] }),
  });
}

export function useParseTransaction() {
  return useMutation<QuickLogDraftModel, Error, string>({
    mutationFn: async (text) => {
      const response = await apiClient
        .post<BaseResponseModel<QuickLogDraftModel>>('/transactions/parse', {
          text,
        })
        .then((res) => res.data);
      if (!response.data) throw new Error('Empty parse response');
      return response.data;
    },
  });
}
