import { PrismaClient } from "@prisma/client";
import { myItems } from "./myItems";

export async function itemsSeed(prisma: PrismaClient) {
  for (let index = 0; index < myItems.length; index += 1) {
    const item = await prisma.items.upsert({
      where: {
        id: index + 1,
      },
      create: {
        item: myItems[index],
      },
      update: {},
    });
    console.log(`Item: ${item.item} seeded`);
  }
}
