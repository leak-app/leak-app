import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  apiClient,
  type BaseResponseModel,
  type PagingResponseModel,
} from '@/shared/api';

import { deserialize } from '../lib/deserialize';
import type {
  CreateTransactionParamsModel,
  GetTransactionsQueryParamsModel,
  TransactionListResponseModel,
  TransactionModel,
} from '../model/types';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
