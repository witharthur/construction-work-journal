export interface WorkEntry {
  id: string;
  date: string;
  workType: string;
  volume: number;
  unit: string;
  workerName: string;
  createdAt: string;
}

export interface WorkType {
  id: string;
  name: string;
}

export interface WorkEntryPayload {
  date: string;
  workType: string;
  volume: number;
  unit: string;
  workerName: string;
}

export interface EntryFilters {
  date?: string;
  search?: string;
  sort: "asc" | "desc";
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

export interface ApiErrorResponse {
  message: string;
  details?: string[];
}
