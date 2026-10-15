import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TRANSFERS_KEY } from '@/entities/transfer';
import { INVESTMENT_KEY, VALUATIONS_KEY } from '@/entities/valuation';
import { WALLETS_KEY } from '@/entities/wallet';
import { apiClient } from '@/shared/api';

/** Deletes a transfer; the API moves the money back. */
export function useDeleteTransfer() {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: WALLETS_KEY });
    queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    queryClient.invalidateQueries({ queryKey: VALUATIONS_KEY });
    queryClient.invalidateQueries({ queryKey: TRANSFERS_KEY });
    queryClient.invalidateQueries({ queryKey: ['report-overview'] });
  };
  return useMutation<unknown, unknown, string>({
    mutationFn: (transferId) => apiClient.delete(`/transfers/${transferId}`),
    onSuccess: refresh,
  });
}
