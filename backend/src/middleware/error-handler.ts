import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { isAppError } from "../utils/errors.js";
import type { ApiErrorResponse } from "../types/api.js";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response<ApiErrorResponse>,
  _next: NextFunction
): void {
  void _next;

  if (isAppError(error)) {
    response.status(error.statusCode).json(
      error.details
        ? {
            message: error.message,
            details: error.details
          }
        : {
            message: error.message
          }
    );
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      message: "Validation failed.",
      details: error.issues.map((issue) => issue.message)
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2024") {
      response.status(503).json({
        message: "Database connection pool is busy. Please retry the request."
      });
      return;
    }

    if (error.code === "P2025") {
      response.status(404).json({ message: "Requested resource was not found." });
      return;
    }
  }

  console.error(error);
  response.status(500).json({ message: "Unexpected server error." });
}
