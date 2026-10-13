import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeSheetsStatus } from '../lib/deserialize';
import type {
  GoogleSheetsStatusModel,
  RawGoogleSheetsStatusModel,
} from '../model/types';

export const GOOGLE_SHEETS_STATUS_KEY = ['google-sheets-status'] as const;

const BASE = '/sync/google-sheets';
const POLL_WHILE_RUNNING_MS = 3000;

async function readStatus(
  request: Promise<AxiosResponse<BaseResponseModel<RawGoogleSheetsStatusModel>>>
): Promise<GoogleSheetsStatusModel> {
  const body = await request.then((response) => response.data);
  if (!body.data) throw new Error('Empty response');
  return deserializeSheetsStatus(body.data);
}

export function useGoogleSheetsStatus() {
  return useQuery<GoogleSheetsStatusModel, Error>({
    queryKey: GOOGLE_SHEETS_STATUS_KEY,
    queryFn: () =>
      readStatus(
        apiClient.get<BaseResponseModel<RawGoogleSheetsStatusModel>>(BASE)
      ),
    // A run started from another tab or by the cron: follow it until it finishes.
    refetchInterval: (query) =>
      query.state.data?.isRunning ? POLL_WHILE_RUNNING_MS : false,
  });
}

/** Asks the API for the Google consent URL, then leaves the app for it. */
export function useConnectGoogleSheets() {
  return useMutation<string, unknown, void>({
    mutationFn: async () => {
      const body = await apiClient
        .post<BaseResponseModel<{ url: string }>>(`${BASE}/connect`)
        .then((response) => response.data);
      if (!body.data?.url) throw new Error('Missing consent URL');
      return body.data.url;
    },
    onSuccess: (url) => {
      window.location.assign(url);
    },
  });
}

export function useSetGoogleSheetsSync() {
  const queryClient = useQueryClient();
  return useMutation<GoogleSheetsStatusModel, unknown, boolean>({
    mutationFn: (enabled) =>
      readStatus(
        apiClient.patch<BaseResponseModel<RawGoogleSheetsStatusModel>>(BASE, {
          enabled,
        })
      ),
    onSuccess: (status) =>
      queryClient.setQueryData(GOOGLE_SHEETS_STATUS_KEY, status),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: GOOGLE_SHEETS_STATUS_KEY }),
  });
}

export function useRunGoogleSheetsSync() {
  const queryClient = useQueryClient();
  return useMutation<GoogleSheetsStatusModel, unknown, void>({
    mutationFn: () =>
      readStatus(
        apiClient.post<BaseResponseModel<RawGoogleSheetsStatusModel>>(
          `${BASE}/run`
        )
      ),
    onSuccess: (status) =>
      queryClient.setQueryData(GOOGLE_SHEETS_STATUS_KEY, status),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: GOOGLE_SHEETS_STATUS_KEY }),
  });
}

export function useDisconnectGoogleSheets() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, void>({
    mutationFn: () => apiClient.delete(BASE),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: GOOGLE_SHEETS_STATUS_KEY }),
  });
}
