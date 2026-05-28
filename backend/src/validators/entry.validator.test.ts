import { describe, expect, it } from "vitest";
import { entryBodySchema, entryQuerySchema } from "./entry.validator.js";

describe("entryBodySchema", () => {
  it("accepts a valid work entry", () => {
    const parsed = entryBodySchema.parse({
      date: "2026-05-28",
      workType: "Concrete Pour",
      volume: "12.5",
      unit: "m3",
      workerName: "Aram Petrosyan"
    });

    expect(parsed.date.toISOString()).toBe("2026-05-28T00:00:00.000Z");
    expect(parsed.volume).toBe(12.5);
  });

  it("rejects non-positive volume", () => {
    const result = entryBodySchema.safeParse({
      date: "2026-05-28",
      workType: "Concrete Pour",
      volume: 0,
      unit: "m3",
      workerName: "Aram Petrosyan"
    });

    expect(result.success).toBe(false);
  });
});

describe("entryQuerySchema", () => {
  it("defaults sorting to descending", () => {
    const parsed = entryQuerySchema.parse({});
    expect(parsed.sort).toBe("desc");
  });
});
