import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import type { CreateTransactionParams, Transaction } from '../model/types';

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponseModel<Transaction>,
    Error,
    CreateTransactionParams
  >({
    mutationFn: async (params) => {
      return apiClient.post<any, BaseResponseModel<Transaction>>(
        '/transactions',
        params
      );
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
