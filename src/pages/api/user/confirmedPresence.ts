import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "@/utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { UserController } from "./_user.controller";
import nc from "next-connect";
import cors from "cors";
import { corsOptions } from "../_utils/_cors.options";

export default nc<NextApiRequest, NextApiResponse>()
  .use(cors(corsOptions))
  .options((req, res) => {
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
  })
  .patch(async (req, res) => {
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
  });
