import { CustomError } from "@/utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "./_user.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isPatch = req.method === "PATCH";
  if (isPatch) {
    try {
      const token = req.headers.authorization;
      const controller = UserController.init();
      await controller.toggleConfirmedPresence(token!);
      res
        .status(StatusCodes.OK)
        .json({ message: "Presença atualizada com sucesso!" });
    } catch (error) {
      const { message, code } = error as CustomError;
      res.status(code || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
