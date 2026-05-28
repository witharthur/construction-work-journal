CREATE TABLE "WorkEntry" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workType" TEXT NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "workerName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WorkType_name_key" ON "WorkType"("name");

CREATE INDEX "WorkEntry_date_idx" ON "WorkEntry"("date");

CREATE INDEX "WorkEntry_workType_idx" ON "WorkEntry"("workType");

CREATE INDEX "WorkEntry_workerName_idx" ON "WorkEntry"("workerName");
