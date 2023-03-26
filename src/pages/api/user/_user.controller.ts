import { CustomError } from "@/utils/CustomError";
import { StatusCodes as code } from "http-status-codes";
import { UserService } from "./_user.service";

export class UserController {
  constructor(private service: UserService) {}

  static init() {
    const service = UserService.init();
    return new UserController(service);
  }

  async toggleConfirmedPresence(token: string) {
    if (!token)
      throw new CustomError(
        "É necessário estar logado para confirmar presença!",
        code.UNAUTHORIZED
      );
    await this.service.toggleConfirmedPresence(token);
  }
}
