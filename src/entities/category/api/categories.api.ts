import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import type { Category, CategoryType } from '../model/types';

export function useCategories(type?: CategoryType) {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get<any>('/categories');
      const resData = response as BaseResponseModel<Category[]>;
      return resData.data ?? [];
    },
    select: (data) => {
      if (!type) return data;
      return data.filter((c) => c.type === type);
    },
  });
}
