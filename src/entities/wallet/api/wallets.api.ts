import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeWallet } from '../lib/deserialize';
import type {
  CreateWalletParamsModel,
  RawWalletModel,
  UpdateWalletParamsModel,
  WalletModel,
} from '../model/types';

export const WALLETS_KEY = ['wallets'] as const;

export function useWallets() {
  return useQuery<WalletModel[], Error>({
    queryKey: WALLETS_KEY,
    queryFn: async () => {
      const res = await apiClient
        .get<BaseResponseModel<RawWalletModel[]>>('/wallets')
        .then((r) => r.data);
      return (res.data ?? []).map(deserializeWallet);
    },
  });
}

function useInvalidateWallets() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: WALLETS_KEY });
    queryClient.invalidateQueries({ queryKey: ['report-overview'] });
  };
}

// Error type is unknown: apiClient rejects with the response body; callers use getApiErrorMessage.
export function useCreateWallet() {
  const invalidate = useInvalidateWallets();
  return useMutation<unknown, unknown, CreateWalletParamsModel>({
    mutationFn: (params) => apiClient.post('/wallets', params),
    onSuccess: invalidate,
  });
}

export function useUpdateWallet() {
  const invalidate = useInvalidateWallets();
  return useMutation<unknown, unknown, UpdateWalletParamsModel>({
    mutationFn: ({ id, ...params }) =>
      apiClient.patch(`/wallets/${id}`, params),
    onSuccess: invalidate,
  });
}

export function useArchiveWallet() {
  const invalidate = useInvalidateWallets();
  return useMutation<unknown, unknown, string>({
    mutationFn: (id) => apiClient.delete(`/wallets/${id}`),
    onSuccess: invalidate,
    // A 404 means another tab archived it: refetch so it disappears here too.
    onError: invalidate,
  });
}
