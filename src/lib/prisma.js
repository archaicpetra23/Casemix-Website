// src/lib/prisma.js
// Prisma 7 + MySQL adapter singleton — mencegah duplikasi koneksi saat hot-reload

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis;

function createPrismaClient() {
  // Prisma 7 adapter menerima connection string langsung
  const url = process.env.DATABASE_URL ?? "mysql://root@localhost:3306/casemix_db";
  const adapter = new PrismaMariaDb(url);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
