import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import {
  deserializePortfolio,
  deserializeValuations,
} from '../lib/deserialize';
import type {
  PortfolioModel,
  RawPortfolioModel,
  RawValuationModel,
  ValuationHistoryItemModel,
} from '../model/types';

export const INVESTMENT_KEY = ['investment-summary'] as const;
export const VALUATIONS_KEY = ['wallet-valuations'] as const;

const MONTHS_SHOWN = 12;

export function usePortfolio() {
  return useQuery<PortfolioModel, Error>({
    queryKey: INVESTMENT_KEY,
    queryFn: async () => {
      const body = await apiClient
        .get<BaseResponseModel<RawPortfolioModel>>('/investments/summary', {
          params: { months: MONTHS_SHOWN },
        })
        .then((response) => response.data);
      if (!body.data) throw new Error('Empty response');
      return deserializePortfolio(body.data);
    },
  });
}

/** Update history of one wallet, newest first. Idle while `walletId` is null. */
export function useWalletValuations(walletId: string | null) {
  return useQuery<ValuationHistoryItemModel[], Error>({
    queryKey: [...VALUATIONS_KEY, walletId],
    enabled: walletId !== null,
    queryFn: async () => {
      const body = await apiClient
        .get<BaseResponseModel<RawValuationModel[]>>(
          `/wallets/${walletId}/valuations`
        )
        .then((response) => response.data);
      return deserializeValuations(body.data ?? []);
    },
  });
}
