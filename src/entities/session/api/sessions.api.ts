import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeSession } from '../lib/deserialize';
import type { RawSessionModel, SessionModel } from '../model/types';

export const SESSIONS_KEY = ['sessions'] as const;

export function useSessions() {
  return useQuery<SessionModel[], Error>({
    queryKey: SESSIONS_KEY,
    queryFn: async () => {
      const res = await apiClient
        .get<BaseResponseModel<RawSessionModel[]>>('/auth/sessions')
        .then((r) => r.data);
      return (res.data ?? []).map(deserializeSession);
    },
  });
}

// Error type is unknown: apiClient rejects with the response body; callers use getApiErrorMessage.
export function useRevokeSession() {
  const qc = useQueryClient();
  return useMutation<unknown, unknown, number>({
    mutationFn: (id) => apiClient.delete(`/auth/sessions/${id}`),
    onSettled: () => qc.invalidateQueries({ queryKey: SESSIONS_KEY }),
  });
}

export function useRevokeOtherSessions() {
  const qc = useQueryClient();
  return useMutation<unknown, unknown, void>({
    mutationFn: () => apiClient.post('/auth/sessions/revoke-others'),
    onSettled: () => qc.invalidateQueries({ queryKey: SESSIONS_KEY }),
  });
}
