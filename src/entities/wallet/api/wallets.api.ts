import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeWallet } from '../lib/deserialize';
import type { RawWalletModel, WalletModel } from '../model/types';

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
