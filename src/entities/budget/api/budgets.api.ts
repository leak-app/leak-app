import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeBudgetReport } from '../lib/deserialize';
import type {
  BudgetModel,
  BudgetReportModel,
  UpsertBudgetParamsModel,
} from '../model/types';

export function useBudgets(month?: number, year?: number) {
  return useQuery<BudgetModel[], Error>({
    queryKey: ['budgets', month, year],
    queryFn: async () => {
      return apiClient
        .get<BaseResponseModel<BudgetModel[]>>('/budgets', {
          params: { month, year },
        })
        .then((res) => res.data)
        .then((res) => res.data || []);
    },
  });
}

export function useBudgetReport(month?: number, year?: number) {
  return useQuery<BudgetReportModel, Error>({
    queryKey: ['budget-report', month, year],
    queryFn: async () => {
      return apiClient
        .get<BaseResponseModel<BudgetReportModel>>('/budgets/report', {
          params: { month, year },
        })
        .then((res) => res.data)
        .then((res) =>
          res.data ? deserializeBudgetReport(res.data) : res.data
        );
    },
  });
}

export function useUpsertBudget() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponseModel<BudgetModel>,
    Error,
    UpsertBudgetParamsModel
  >({
    mutationFn: async (params) => {
      return apiClient
        .post<BaseResponseModel<BudgetModel>>('/budgets', params)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budget-report'] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponseModel<void>, Error, string>({
    mutationFn: async (id) => {
      return apiClient
        .delete<BaseResponseModel<void>>(`/budgets/${id}`)
        .then((res) => res.data);
    },
    // Also on error: a 404 means another tab removed it; refetch either way.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budget-report'] });
    },
  });
}
