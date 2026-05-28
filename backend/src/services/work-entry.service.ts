import type { WorkEntry } from "@prisma/client";
import { WorkEntryRepository, type WorkEntryListResult } from "../repositories/work-entry.repository.js";
import type { EntryBodyInput, EntryQueryInput } from "../validators/entry.validator.js";

export class WorkEntryService {
  public constructor(private readonly repository = new WorkEntryRepository()) {}

  public listEntries(query: EntryQueryInput): Promise<WorkEntryListResult> {
    return this.repository.findMany(query);
  }

  public createEntry(data: EntryBodyInput): Promise<WorkEntry> {
    return this.repository.create(data);
  }

  public updateEntry(id: string, data: EntryBodyInput): Promise<WorkEntry> {
    return this.repository.update(id, data);
  }

  public deleteEntry(id: string): Promise<WorkEntry> {
    return this.repository.delete(id);
  }
}
