import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INVESTMENT_KEY, VALUATIONS_KEY } from '@/entities/valuation';
import { WALLETS_KEY } from '@/entities/wallet';
import { apiClient } from '@/shared/api';

import type { CreateValuationParamsModel } from '../model/types';

/** Saves a new balance for an investment wallet. */
export function useCreateValuation() {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: WALLETS_KEY });
    queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    queryClient.invalidateQueries({ queryKey: VALUATIONS_KEY });
    queryClient.invalidateQueries({ queryKey: ['report-overview'] });
  };
  return useMutation<unknown, unknown, CreateValuationParamsModel>({
    mutationFn: ({ walletId, ...body }) =>
      apiClient.post(`/wallets/${walletId}/valuations`, body),
    onSuccess: refresh,
    // 409: the balance moved while the sheet was open. Reload it so the next try is right.
    onError: refresh,
  });
}
