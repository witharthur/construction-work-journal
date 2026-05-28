import type { Prisma, WorkEntry } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { dateBounds } from "../utils/date.js";
import type { EntryBodyInput, EntryQueryInput } from "../validators/entry.validator.js";

export interface WorkEntryListResult {
  entries: WorkEntry[];
  total: number;
}

function buildWhere(query: EntryQueryInput): Prisma.WorkEntryWhereInput {
  const where: Prisma.WorkEntryWhereInput = {};

  if (query.date) {
    const { start, end } = dateBounds(query.date);
    where.date = {
      gte: start,
      lt: end
    };
  }

  if (query.search) {
    where.OR = [
      { workType: { contains: query.search, mode: "insensitive" } },
      { workerName: { contains: query.search, mode: "insensitive" } },
      { unit: { contains: query.search, mode: "insensitive" } }
    ];
  }

  return where;
}

export class WorkEntryRepository {
  public async findMany(query: EntryQueryInput): Promise<WorkEntryListResult> {
    const where = buildWhere(query);

    const [entries, total] = await prisma.$transaction([
      prisma.workEntry.findMany({
        where,
        orderBy: [{ date: query.sort }, { createdAt: "desc" }]
      }),
      prisma.workEntry.count({ where })
    ]);

    return { entries, total };
  }

  public async create(data: EntryBodyInput): Promise<WorkEntry> {
    return prisma.workEntry.create({
      data: {
        date: data.date,
        workType: data.workType,
        volume: data.volume,
        unit: data.unit,
        workerName: data.workerName
      }
    });
  }

  public async update(id: string, data: EntryBodyInput): Promise<WorkEntry> {
    return prisma.workEntry.update({
      where: { id },
      data: {
        date: data.date,
        workType: data.workType,
        volume: data.volume,
        unit: data.unit,
        workerName: data.workerName
      }
    });
  }

  public async delete(id: string): Promise<WorkEntry> {
    return prisma.workEntry.delete({
      where: { id }
    });
  }
}
