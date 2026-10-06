import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserialize } from '../lib/deserialize';
import type {
  ReflectionQueueModel,
  ReviewOutcomeParamsModel,
  TransactionModel,
} from '../model/types';

export const REFLECTION_QUEUE_KEY = ['reflection-queue'];

export function useReflectionQueue() {
  return useQuery<ReflectionQueueModel, Error>({
    queryKey: REFLECTION_QUEUE_KEY,
    queryFn: async () => {
      const response = await apiClient
        .get<BaseResponseModel<ReflectionQueueModel>>('/outcomes/queue')
        .then((res) => res.data);
      const data = response.data ?? { items: [], total: 0 };
      return { items: data.items.map(deserialize), total: data.total };
    },
  });
}

export function useReviewTransaction() {
  const queryClient = useQueryClient();

  return useMutation<TransactionModel, Error, ReviewOutcomeParamsModel>({
    mutationFn: async ({ transactionId, outcome, leakReason }) => {
      const response = await apiClient
        .patch<BaseResponseModel<TransactionModel>>(
          `/outcomes/${transactionId}`,
          {
            outcome,
            leakReason,
          }
        )
        .then((res) => res.data);
      if (!response.data) throw new Error('Empty review response');
      return deserialize(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REFLECTION_QUEUE_KEY });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['leak-rate'] });
      queryClient.invalidateQueries({ queryKey: ['reclaim-offer'] });
    },
  });
}
