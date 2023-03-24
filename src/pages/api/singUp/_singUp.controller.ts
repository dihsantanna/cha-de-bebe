import { IUser } from "@/types/IUser";
import { CustomError } from "@/utils/CustomError";
import { SingUpService } from "./_singUp.service";
import { StatusCodes as code } from "http-status-codes";

export class SingUpController {
  constructor(private service: SingUpService, private user: IUser) {}

  static init(user: IUser) {
    const service = SingUpService.init();
    const controller = new SingUpController(service, user);
    controller.validate();
    return controller;
  }

  validate() {
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;

    const { name, email } = this.user;
    if (!name || !email) {
      throw new CustomError(
        "Todos os campos são obrigatórios",
        code.BAD_REQUEST
      );
    }

    if (name.length < 3) {
      throw new CustomError(
        "O nome deve conter pelo menos 3 caracteres",
        code.BAD_REQUEST
      );
    }

    if (!emailRegex.test(email)) {
      throw new CustomError("E-mail inválido", code.BAD_REQUEST);
    }
  }

  async singUp() {
    const { user, token } = await this.service.singUp(this.user);

    return {
      user,
      token,
    };
  }
}
