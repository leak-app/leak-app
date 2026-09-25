import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeContribution, deserializeGoal } from '../lib/deserialize';
import type {
  GoalContributionModel,
  GoalModel,
  GoalMovementParamsModel,
  GoalParamsModel,
  RawGoalContributionModel,
  RawGoalModel,
} from '../model/types';

export const GOALS_KEY = ['goals'] as const;

export function useGoals() {
  return useQuery<GoalModel[], Error>({
    queryKey: GOALS_KEY,
    queryFn: async () => {
      const res = await apiClient
        .get<BaseResponseModel<RawGoalModel[]>>('/goals')
        .then((r) => r.data);
      return (res.data ?? []).map((g) => deserializeGoal(g));
    },
  });
}

export function useGoalContributions(goalId: string | null) {
  return useQuery<GoalContributionModel[], Error>({
    queryKey: ['goal-contributions', goalId],
    enabled: !!goalId,
    queryFn: async () => {
      const res = await apiClient
        .get<BaseResponseModel<{ contributions: RawGoalContributionModel[] }>>(
          `/goals/${goalId}/contributions`,
          { params: { limit: 50 } }
        )
        .then((r) => r.data);
      return (res.data?.contributions ?? []).map(deserializeContribution);
    },
  });
}

function useInvalidate() {
  const qc = useQueryClient();
  return (goalId?: string) => {
    qc.invalidateQueries({ queryKey: GOALS_KEY });
    qc.invalidateQueries({ queryKey: ['report-overview'] });
    if (goalId) {
      qc.invalidateQueries({ queryKey: ['goal-contributions', goalId] });
      qc.invalidateQueries({ queryKey: ['wallets'] });
    }
  };
}

// Error type is unknown: apiClient rejects with the response body; callers use getApiErrorMessage.
export function useCreateGoal() {
  const invalidate = useInvalidate();
  return useMutation<unknown, unknown, GoalParamsModel>({
    mutationFn: (params) => apiClient.post('/goals', params),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateGoal() {
  const invalidate = useInvalidate();
  return useMutation<unknown, unknown, GoalParamsModel & { id: string }>({
    mutationFn: ({ id, ...params }) => apiClient.patch(`/goals/${id}`, params),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteGoal() {
  const invalidate = useInvalidate();
  return useMutation<unknown, unknown, string>({
    mutationFn: (id) => apiClient.delete(`/goals/${id}`),
    onSuccess: () => invalidate(),
  });
}

export function useMoveGoalMoney() {
  const invalidate = useInvalidate();
  return useMutation<unknown, unknown, GoalMovementParamsModel>({
    mutationFn: ({ goalId, kind, ...body }) =>
      apiClient.post(`/goals/${goalId}/${kind}`, body),
    onSuccess: (_data, vars) => invalidate(vars.goalId),
  });
}
