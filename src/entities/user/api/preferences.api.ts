import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import type { UserPreferencesModel } from '../model/types';

export const USER_PREFERENCES_KEY = ['user-preferences'] as const;

const PATH = '/users/me/preferences';

export function useUserPreferences() {
  return useQuery<UserPreferencesModel, Error>({
    queryKey: USER_PREFERENCES_KEY,
    queryFn: async () => {
      const body = await apiClient
        .get<BaseResponseModel<UserPreferencesModel>>(PATH)
        .then((response) => response.data);
      if (!body.data) throw new Error('Empty preferences response');
      return body.data;
    },
  });
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();
  return useMutation<UserPreferencesModel, Error, UserPreferencesModel>({
    mutationFn: async (preferences) => {
      const body = await apiClient
        .patch<BaseResponseModel<UserPreferencesModel>>(PATH, preferences)
        .then((response) => response.data);
      if (!body.data) throw new Error('Empty preferences response');
      return body.data;
    },
    onSuccess: (saved) => queryClient.setQueryData(USER_PREFERENCES_KEY, saved),
    onError: () =>
      queryClient.invalidateQueries({ queryKey: USER_PREFERENCES_KEY }),
  });
}
