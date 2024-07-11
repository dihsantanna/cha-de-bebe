import { PrismaClient } from "@prisma/client";
import { itemsSeed } from "./items.seed";
const prisma = new PrismaClient();

async function main() {
  await itemsSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
