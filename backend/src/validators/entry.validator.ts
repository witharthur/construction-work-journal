import { z } from "zod";
import { parseDateOnly } from "../utils/date.js";

const trimRequired = (label: string) =>
  z
    .string({ required_error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`);

export const entryBodySchema = z.object({
  date: z
    .string({ required_error: "Date is required." })
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format.")
    .transform(parseDateOnly),
  workType: trimRequired("Work type"),
  volume: z.coerce
    .number({
      required_error: "Volume is required.",
      invalid_type_error: "Volume must be numeric."
    })
    .positive("Volume must be positive."),
  unit: trimRequired("Unit"),
  workerName: trimRequired("Worker full name")
});

export const entryParamsSchema = z.object({
  id: z.string().cuid("Entry id is invalid.")
});

export const entryQuerySchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format.")
    .optional(),
  search: z.string().trim().optional(),
  sort: z.enum(["asc", "desc"]).default("desc")
});

export type EntryBodyInput = z.infer<typeof entryBodySchema>;
export type EntryQueryInput = z.infer<typeof entryQuerySchema>;
