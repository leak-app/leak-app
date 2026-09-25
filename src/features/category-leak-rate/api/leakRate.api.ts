import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeLeakReport } from '../lib/deserialize';
import type {
  LeakRatePeriodModel,
  LeakRateReportApiModel,
  LeakRateReportModel,
} from '../model/types';

export function currentPeriod(): LeakRatePeriodModel {
  const now = dayjs();
  return { month: now.month() + 1, year: now.year() };
}

export function useLeakRate(period: LeakRatePeriodModel = currentPeriod()) {
  return useQuery<LeakRateReportModel, Error>({
    queryKey: ['leak-rate', period.month, period.year],
    queryFn: async () => {
      const response = await apiClient
        .get<BaseResponseModel<LeakRateReportApiModel>>('/outcomes/leak-rate', {
          params: period,
        })
        .then((res) => res.data);
      if (!response.data) throw new Error('Empty leak-rate response');
      return deserializeLeakReport(response.data);
    },
  });
}
