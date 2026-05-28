import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

function buildDatabaseUrl(databaseUrl: string): string {
  const url = new URL(databaseUrl);

  // The hosted pooled database has a small connection allowance. Keeping the
  // app pool small prevents local dev reloads and browser retries from
  // exhausting it and causing intermittent P2024 errors.
  url.searchParams.set("connection_limit", "2");
  url.searchParams.set("pool_timeout", "30");

  return url.toString();
}

export const prisma = new PrismaClient({
  datasourceUrl: buildDatabaseUrl(env.DATABASE_URL),
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"]
});
