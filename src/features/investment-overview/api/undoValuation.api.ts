import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INVESTMENT_KEY, VALUATIONS_KEY } from '@/entities/valuation';
import { WALLETS_KEY } from '@/entities/wallet';
import { apiClient } from '@/shared/api';

/** Deletes the newest update of a wallet; the API moves the balance back. */
export function useUndoValuation() {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: WALLETS_KEY });
    queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    queryClient.invalidateQueries({ queryKey: VALUATIONS_KEY });
    queryClient.invalidateQueries({ queryKey: ['report-overview'] });
  };
  return useMutation<unknown, unknown, string>({
    mutationFn: (valuationId) => apiClient.delete(`/valuations/${valuationId}`),
    onSuccess: refresh,
    // 409: a newer update appeared meanwhile. Reload so the right row has the button.
    onError: refresh,
  });
}
