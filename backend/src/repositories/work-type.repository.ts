import type { WorkType } from "@prisma/client";
import { prisma } from "../config/prisma.js";

export class WorkTypeRepository {
  public async findMany(): Promise<WorkType[]> {
    return prisma.workType.findMany({
      orderBy: { name: "asc" }
    });
  }
}
