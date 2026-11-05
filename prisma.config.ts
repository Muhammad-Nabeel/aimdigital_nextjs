import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Prisma does not read .env files itself; hosted builds provide real environment variables.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Migrations use the direct connection; the app uses the pooled DATABASE_URL.
  datasource: { url: process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL },
});
