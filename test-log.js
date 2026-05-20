const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.logAktivitas.count();
  console.log("Total logs:", count);
  const logs = await prisma.logAktivitas.findMany({ take: 5, orderBy: { waktu: 'desc' } });
  console.log(logs);
}
main().catch(console.error).finally(() => prisma.$disconnect());
