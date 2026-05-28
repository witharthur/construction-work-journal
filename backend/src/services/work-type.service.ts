import type { WorkType } from "@prisma/client";
import { WorkTypeRepository } from "../repositories/work-type.repository.js";

export class WorkTypeService {
  public constructor(private readonly repository = new WorkTypeRepository()) {}

  public listWorkTypes(): Promise<WorkType[]> {
    return this.repository.findMany();
  }
}
