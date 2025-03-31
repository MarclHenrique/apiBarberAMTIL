require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const dbVersion = await prisma.$queryRaw`SELECT version()`;
  console.log("PostgreSQL version:", dbVersion[0].version);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
