import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeBuddyReaction } from '../lib/buddy';
import type { BuddyReactionModel, RawBuddyReactionModel } from '../model/types';

export async function fetchBuddyReaction(
  transactionId: string
): Promise<BuddyReactionModel> {
  const body = await apiClient
    .get<BaseResponseModel<RawBuddyReactionModel>>(
      `/ai-commentary/transactions/${encodeURIComponent(transactionId)}`
    )
    .then((response) => response.data);
  if (!body.data) throw new Error('Empty buddy response');
  return deserializeBuddyReaction(body.data);
}
