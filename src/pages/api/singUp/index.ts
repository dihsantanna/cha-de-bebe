// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUser, IUserRegistered } from "@/types/IUser";
import { CustomError } from "@/utils/CustomError";
import type { NextApiRequest, NextApiResponse } from "next";
import { SingUpController } from "./_singUp.controller";
import { StatusCodes } from "http-status-codes";

interface Response {
  message?: string;
  token?: string;
  user?: IUserRegistered;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const isPost = req.method === "POST";
  if (isPost) {
    try {
      const { name, email } = req.body as IUser;
      const user = { name, email };

      const controller = SingUpController.init(user);
      const response = await controller.singUp();

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      const { message, code } = error as CustomError;
      res.status(code || 500).json({ message });
    }
  }
}
