export interface ApiErrorResponse {
  message: string;
  details?: string[];
}

export interface ApiSuccessResponse<TData> {
  data: TData;
}

export interface ApiListResponse<TData> {
  data: TData[];
  meta: {
    total: number;
  };
}
