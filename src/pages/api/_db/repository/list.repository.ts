import { Prisma } from "@prisma/client";
import { prisma } from "../connection";

export class ListRepository {
  constructor(
    private db: Prisma.ItemsDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  ) {}

  static init() {
    const db = prisma.items;
    return new ListRepository(db);
  }

  async listMissingItems() {
    const list = await this.db.findMany({
      where: { UsersItems: null },
    });
    return list;
  }
}
