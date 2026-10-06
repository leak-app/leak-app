import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeReclaimOffer } from '../lib/deserialize';
import type { RawReclaimOfferModel, ReclaimOfferModel } from '../model/types';

export const RECLAIM_OFFER_KEY = ['reclaim-offer'] as const;

export function useReclaimOffer() {
  return useQuery<ReclaimOfferModel, Error>({
    queryKey: RECLAIM_OFFER_KEY,
    queryFn: async () => {
      const res = await apiClient
        .get<BaseResponseModel<RawReclaimOfferModel>>('/reclaim/offer')
        .then((r) => r.data);
      if (!res.data) throw new Error('empty');
      return deserializeReclaimOffer(res.data);
    },
    staleTime: 0,
  });
}

export interface TransferReclaimParamsModel {
  goalId: string;
  amount: number;
  accountId?: string;
}

// Error type is unknown: apiClient rejects with the response body; callers use getApiErrorMessage.
export function useTransferReclaim() {
  const qc = useQueryClient();
  return useMutation<unknown, unknown, TransferReclaimParamsModel>({
    mutationFn: (params) => apiClient.post('/reclaim/offer/transfer', params),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: RECLAIM_OFFER_KEY });
      qc.invalidateQueries({ queryKey: ['goals'] });
      qc.invalidateQueries({ queryKey: ['goal-contributions'] });
      qc.invalidateQueries({ queryKey: ['wallets'] });
      qc.invalidateQueries({ queryKey: ['report-overview'] });
    },
  });
}

export function useDismissReclaim() {
  const qc = useQueryClient();
  return useMutation<unknown, unknown, void>({
    mutationFn: () => apiClient.post('/reclaim/offer/dismiss'),
    onSettled: () => qc.invalidateQueries({ queryKey: RECLAIM_OFFER_KEY }),
  });
}
