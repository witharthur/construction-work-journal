import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/workEntry";

export const apiClient = axios.create({
  baseURL: String(import.meta.env.VITE_API_URL ?? "/api"),
  headers: {
    "Content-Type": "application/json"
  }
});

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;

    if (response?.details?.length) {
      return response.details.join(" ");
    }

    if (response?.message) {
      return response.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}
