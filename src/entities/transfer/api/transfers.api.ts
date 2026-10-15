import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeTransfer } from '../lib/deserialize';
import type { RawTransferModel, TransferItemModel } from '../model/types';

export const TRANSFERS_KEY = ['transfers'] as const;

/** Transfers into or out of one wallet, newest first. Idle while `walletId` is null. */
export function useWalletTransfers(walletId: string | null) {
  return useQuery<TransferItemModel[], Error>({
    queryKey: [...TRANSFERS_KEY, walletId],
    enabled: walletId !== null,
    queryFn: async () => {
      const body = await apiClient
        .get<BaseResponseModel<RawTransferModel[]>>('/transfers', {
          params: { accountId: walletId },
        })
        .then((response) => response.data);
      return (body.data ?? []).map((raw) =>
        deserializeTransfer(raw, walletId as string)
      );
    },
  });
}
