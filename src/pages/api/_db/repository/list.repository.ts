import { Items, Prisma } from "@prisma/client";
import { prisma } from "../connection";

export class ListRepository {
  constructor(
    private itemsTable: Prisma.ItemsDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
    private usersItemsTable: Prisma.UsersItemsDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  ) {}

  static init() {
    const itemsTable = prisma.items;
    const usersItemsTable = prisma.usersItems;
    return new ListRepository(itemsTable, usersItemsTable);
  }

  async listMissingItems() {
    const list = await this.itemsTable.findMany({
      where: { UsersItems: null },
    });
    return list;
  }

  async findUserItemByItemId(itemId: number) {
    const userItem = await this.usersItemsTable.findUnique({
      where: {
        itemId,
      },
    });

    return userItem;
  }

  async toggleUserItem(userId: number, itemId: number, exists: boolean) {
    if (exists) {
      await this.usersItemsTable.delete({
        where: { itemId: itemId },
      });

      return;
    }

    await this.usersItemsTable.create({
      data: {
        userId,
        itemId,
      },
    });
  }

  async listUserItems(userId: number) {
    const userItems = await this.usersItemsTable.findMany({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (userItems.length) {
      return userItems.map((item) => item.items) as unknown as Items[];
    }
    return userItems as unknown as Items[];
  }
}
