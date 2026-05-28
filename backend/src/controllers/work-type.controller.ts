import type { Request, Response } from "express";
import type { WorkType } from "@prisma/client";
import { WorkTypeService } from "../services/work-type.service.js";
import type { ApiListResponse } from "../types/api.js";

const workTypeService = new WorkTypeService();

export async function listWorkTypes(
  _request: Request,
  response: Response<ApiListResponse<WorkType>>
): Promise<void> {
  const workTypes = await workTypeService.listWorkTypes();

  response.json({
    data: workTypes,
    meta: { total: workTypes.length }
  });
}
