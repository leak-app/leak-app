import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import type {
  CategoryModel,
  CategoryType,
  CreateCategoryParamsModel,
  UpdateCategoryParamsModel,
} from '../model/types';

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

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponseModel<CategoryModel>,
    Error,
    CreateCategoryParamsModel
  >({
    mutationFn: async (params) => {
      return apiClient
        .post<BaseResponseModel<CategoryModel>>('/categories', params)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponseModel<CategoryModel>,
    Error,
    UpdateCategoryParamsModel
  >({
    mutationFn: async ({ id, ...params }) => {
      return apiClient
        .patch<BaseResponseModel<CategoryModel>>(`/categories/${id}`, params)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponseModel<void>, Error, string>({
    mutationFn: async (id) => {
      return apiClient
        .delete<BaseResponseModel<void>>(`/categories/${id}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
