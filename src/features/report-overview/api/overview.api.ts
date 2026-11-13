import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useBudgetReport } from '@/entities/budget';
import { apiClient, type BaseResponseModel } from '@/shared/api';

import {
  deserializeBudgetCard,
  deserializeCashFlow,
  deserializeReportOverview,
} from '../lib';
import type {
  BudgetCardModel,
  CashFlowModel,
  RawMonthlyCashFlowModel,
  ReportOverviewModel,
} from '../model';

/** This month's budget report, shaped for the overview card. Saving a transaction refreshes it. */
export function useBudgetCard() {
  const { data, isLoading, isError } = useBudgetReport();
  const card = useMemo<BudgetCardModel | undefined>(
    () => (data ? deserializeBudgetCard(data) : undefined),
    [data]
  );
  return { card, isLoading, isError };
}

export function useReportOverview() {
  return useQuery<ReportOverviewModel, Error>({
    queryKey: ['report-overview'],
    queryFn: async () => {
      const response = await apiClient
        .get<BaseResponseModel<any>>('/overview/summary')
        .then((res) => res.data);

      return deserializeReportOverview(response.data);
    },
  });
}

export function useMonthlyCashFlow() {
  return useQuery<CashFlowModel, Error>({
    // Under 'report-overview' so saving a transaction (which invalidates that prefix) refreshes it.
    queryKey: ['report-overview', 'monthly'],
    queryFn: async () => {
      const res = await apiClient
        .get<BaseResponseModel<RawMonthlyCashFlowModel>>('/overview/monthly')
        .then((r) => r.data);
      if (!res.data) throw new Error('empty');
      return deserializeCashFlow(res.data);
    },
  });
}
