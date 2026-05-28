import { z } from "zod";
import type { Translation } from "../../i18n";

export function createEntryFormSchema(t: Translation) {
  return z.object({
    date: z.string().min(1, t.validation.dateRequired),
    workType: z.string().trim().min(1, t.validation.workTypeRequired),
    volume: z.preprocess(
      (value) => {
        if (typeof value === "string") {
          const trimmedValue = value.trim();
          return trimmedValue === "" ? undefined : Number(trimmedValue);
        }

        return value;
      },
      z
        .number({
          required_error: t.validation.volumeRequired,
          invalid_type_error: t.validation.volumeNumeric
        })
        .finite(t.validation.volumeNumeric)
        .positive(t.validation.volumePositive)
    ),
    unit: z.string().trim().min(1, t.validation.unitRequired),
    workerName: z.string().trim().min(1, t.validation.workerNameRequired)
  });
}

export type EntryFormValues = z.infer<ReturnType<typeof createEntryFormSchema>>;
