// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUser, IUserRegistered } from "@/types/IUser";
import { CustomError } from "@/utils/CustomError";
import type { NextApiRequest, NextApiResponse } from "next";
import { SingUpController } from "./_singUp.controller";
import { StatusCodes } from "http-status-codes";
import nc from "next-connect";
import cors from "cors";
import { corsOptions } from "../_utils/_cors.options";

interface Response {
  message?: string;
  token?: string;
  user?: IUserRegistered;
}
export default nc<NextApiRequest, NextApiResponse<Response>>()
  .use(cors(corsOptions))
  .options((req, res) => {
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
  })
  .post(async (req, res) => {
    try {
      const { name, username } = req.body as IUser;
      const user = { name, username };

      const controller = SingUpController.init(user);
      const response = await controller.singUp();

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      const { message, code } = error as CustomError;
      res.status(code || 500).json({ message });
    }
  });
