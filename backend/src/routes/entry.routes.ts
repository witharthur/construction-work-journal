import { Router } from "express";
import {
  createEntry,
  deleteEntry,
  listEntries,
  updateEntry
} from "../controllers/work-entry.controller.js";
import { validateRequest } from "../middleware/validate.js";
import {
  entryBodySchema,
  entryParamsSchema
} from "../validators/entry.validator.js";

export const entryRoutes = Router();

entryRoutes.get("/", listEntries);
entryRoutes.post("/", validateRequest(entryBodySchema, "body"), createEntry);
entryRoutes.put(
  "/:id",
  validateRequest(entryParamsSchema, "params"),
  validateRequest(entryBodySchema, "body"),
  updateEntry
);
entryRoutes.delete("/:id", validateRequest(entryParamsSchema, "params"), deleteEntry);
