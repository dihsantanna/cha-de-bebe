import { IUser } from "@/types/IUser";
import { Prisma } from "@prisma/client";
import { prisma } from "../connection";

export class UserRepository {
  constructor(
    private db: Prisma.UsersDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  ) {}

  static init() {
    const db = prisma.users;
    return new UserRepository(db);
  }

  async create(user: IUser) {
    const newUser = await this.db.create({
      data: user,
    });
    return newUser;
  }

  async findByEmailHash(email: string) {
    return await this.db.findUnique({
      where: { email },
    });
  }
}