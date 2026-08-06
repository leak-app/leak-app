import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import type { CategoryModel, CategoryType } from '../model/types';

export function useCategories(type?: CategoryType) {
  return useQuery<CategoryModel[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      return apiClient
        .get<BaseResponseModel<CategoryModel[]>>('/categories')
        .then((res) => res.data)
        .then((res) => res.data || []);
    },
    select: (data) => {
      if (!type) return data;
      return data.filter((c) => c.type === type);
    },
  });
}
