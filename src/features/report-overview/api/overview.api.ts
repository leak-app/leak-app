import { useQuery } from '@tanstack/react-query';

import { apiClient, type BaseResponseModel } from '@/shared/api';

import { deserializeReportOverview } from '../lib';
import type { ReportOverviewModel } from '../model';

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
