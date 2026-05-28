import type { Request, Response } from "express";
import type { ApiErrorResponse } from "../types/api.js";

export function notFoundHandler(request: Request, response: Response<ApiErrorResponse>): void {
  response.status(404).json({
    message: `Route ${request.method} ${request.originalUrl} was not found.`
  });
}
