import { describe, expect, it } from "vitest";
import { translations } from "../../i18n";
import { createEntryFormSchema } from "./entryFormSchema";

describe("entryFormSchema", () => {
  const entryFormSchema = createEntryFormSchema(translations.en);

  it("accepts valid form values", () => {
    const result = entryFormSchema.safeParse({
      date: "2026-05-28",
      workType: "Concrete Pour",
      volume: "10.5",
      unit: "m3",
      workerName: "Aram Petrosyan"
    });

    expect(result.success).toBe(true);
  });

  it("rejects negative volume", () => {
    const result = entryFormSchema.safeParse({
      date: "2026-05-28",
      workType: "Concrete Pour",
      volume: -1,
      unit: "m3",
      workerName: "Aram Petrosyan"
    });

    expect(result.success).toBe(false);
  });

  it("rejects non-numeric volume", () => {
    const result = entryFormSchema.safeParse({
      date: "2026-05-28",
      workType: "Concrete Pour",
      volume: "twenty",
      unit: "m3",
      workerName: "Aram Petrosyan"
    });

    expect(result.success).toBe(false);
  });
});
