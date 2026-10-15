import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TRANSFERS_KEY } from '@/entities/transfer';
import { INVESTMENT_KEY, VALUATIONS_KEY } from '@/entities/valuation';
import { WALLETS_KEY } from '@/entities/wallet';
import { apiClient } from '@/shared/api';

export interface CreateTransferParamsModel {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  note?: string;
}

/** Moves money between two wallets. It is not income or expense. */
export function useCreateTransfer() {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: WALLETS_KEY });
    queryClient.invalidateQueries({ queryKey: INVESTMENT_KEY });
    queryClient.invalidateQueries({ queryKey: VALUATIONS_KEY });
    queryClient.invalidateQueries({ queryKey: TRANSFERS_KEY });
    queryClient.invalidateQueries({ queryKey: ['report-overview'] });
  };
  return useMutation<unknown, unknown, CreateTransferParamsModel>({
    mutationFn: (params) => apiClient.post('/transfers', params),
    onSuccess: refresh,
    // A wallet may have been archived meanwhile: reload so the pickers are right.
    onError: refresh,
  });
}
