import { apiClient } from "./client";
import type {
  ApiListResponse,
  ApiSuccessResponse,
  EntryFilters,
  WorkEntry,
  WorkEntryPayload,
  WorkType
} from "../types/workEntry";

export async function fetchEntries(filters: EntryFilters): Promise<ApiListResponse<WorkEntry>> {
  const response = await apiClient.get<ApiListResponse<WorkEntry>>("/entries", {
    params: {
      date: filters.date || undefined,
      search: filters.search || undefined,
      sort: filters.sort
    }
  });

  return response.data;
}

export async function createEntry(payload: WorkEntryPayload): Promise<WorkEntry> {
  const response = await apiClient.post<ApiSuccessResponse<WorkEntry>>("/entries", payload);
  return response.data.data;
}

export async function updateEntry(id: string, payload: WorkEntryPayload): Promise<WorkEntry> {
  const response = await apiClient.put<ApiSuccessResponse<WorkEntry>>(`/entries/${id}`, payload);
  return response.data.data;
}

export async function deleteEntry(id: string): Promise<WorkEntry> {
  const response = await apiClient.delete<ApiSuccessResponse<WorkEntry>>(`/entries/${id}`);
  return response.data.data;
}

export async function fetchWorkTypes(): Promise<WorkType[]> {
  const response = await apiClient.get<ApiListResponse<WorkType>>("/work-types");
  return response.data.data;
}
