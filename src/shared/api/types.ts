export interface BaseResponseModel<T = any> {
  data?: T;
  success?: boolean;
  error?: {
    message: string | string[];
    error: string;
    statusCode: number;
  };
}

export interface PagingMetaModel {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PagingResponseModel<T = any> {
  data: T[];
  meta: PagingMetaModel;
}
