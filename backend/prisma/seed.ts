import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const workTypes = [
  "Concrete Pour",
  "Rebar Installation",
  "Formwork",
  "Masonry",
  "Excavation",
  "Backfilling",
  "Waterproofing",
  "Electrical Rough-In",
  "Plumbing Rough-In"
];

async function main(): Promise<void> {
  await prisma.workType.createMany({
    data: workTypes.map((name) => ({ name })),
    skipDuplicates: true
  });

  const existingEntries = await prisma.workEntry.count();

  if (existingEntries === 0) {
    await prisma.workEntry.createMany({
      data: [
        {
          date: new Date("2026-05-28T00:00:00.000Z"),
          workType: "Concrete Pour",
          volume: 42.5,
          unit: "m3",
          workerName: "Aram Petrosyan"
        },
        {
          date: new Date("2026-05-28T00:00:00.000Z"),
          workType: "Rebar Installation",
          volume: 1200,
          unit: "kg",
          workerName: "Mariam Hakobyan"
        },
        {
          date: new Date("2026-05-27T00:00:00.000Z"),
          workType: "Formwork",
          volume: 86,
          unit: "m2",
          workerName: "Gor Sargsyan"
        }
      ]
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
