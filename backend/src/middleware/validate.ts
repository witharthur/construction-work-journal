import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { ZodError } from "zod";
import { AppError } from "../utils/errors.js";

type RequestPart = "body" | "params";
type MutableRequestParts = Request & Record<RequestPart, unknown>;

export function validateRequest<TSchema extends ZodType<unknown>>(
  schema: TSchema,
  part: RequestPart
) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    try {
      const typedRequest = request as MutableRequestParts;
      const parsedValue = schema.parse(typedRequest[part]);
      typedRequest[part] = parsedValue;
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        next(
          new AppError(
            "Validation failed.",
            400,
            error.issues.map((issue) => issue.message)
          )
        );
        return;
      }

      next(error);
    }
  };
}
