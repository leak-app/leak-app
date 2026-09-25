import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeCashFlow, deserializeReportOverview } from '../lib';
import type {
  CashFlowModel,
  RawMonthlyCashFlowModel,
  ReportOverviewModel,
} from '../model';

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
