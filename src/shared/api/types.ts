export interface BaseResponseModel<T = any> {
  data?: T;
  success?: boolean;
  error?: {
    message: string | string[];
    error: string;
    statusCode: number;
  };
}
