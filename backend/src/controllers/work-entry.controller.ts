import type { Request, Response } from "express";
import type { WorkEntry } from "@prisma/client";
import { WorkEntryService } from "../services/work-entry.service.js";
import type { ApiListResponse, ApiSuccessResponse } from "../types/api.js";
import {
  entryQuerySchema,
  type EntryBodyInput
} from "../validators/entry.validator.js";

const workEntryService = new WorkEntryService();

type EntryParams = { id: string };

export async function listEntries(
  request: Request,
  response: Response<ApiListResponse<WorkEntry>>
): Promise<void> {
  const query = entryQuerySchema.parse(request.query);
  const result = await workEntryService.listEntries(query);

  response.json({
    data: result.entries,
    meta: { total: result.total }
  });
}

export async function createEntry(
  request: Request<unknown, ApiSuccessResponse<WorkEntry>, EntryBodyInput>,
  response: Response<ApiSuccessResponse<WorkEntry>>
): Promise<void> {
  const entry = await workEntryService.createEntry(request.body);
  response.status(201).json({ data: entry });
}

export async function updateEntry(
  request: Request<EntryParams, ApiSuccessResponse<WorkEntry>, EntryBodyInput>,
  response: Response<ApiSuccessResponse<WorkEntry>>
): Promise<void> {
  const entry = await workEntryService.updateEntry(request.params.id, request.body);
  response.json({ data: entry });
}

export async function deleteEntry(
  request: Request<EntryParams, ApiSuccessResponse<WorkEntry>>,
  response: Response<ApiSuccessResponse<WorkEntry>>
): Promise<void> {
  const entry = await workEntryService.deleteEntry(request.params.id);
  response.json({ data: entry });
}
