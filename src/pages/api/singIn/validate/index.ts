// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUserRegistered } from "@/types/IUser";
import { CustomError } from "@/utils/CustomError";
import type { NextApiRequest, NextApiResponse } from "next";
import { SingInController } from "../_singIn.controller";
import { StatusCodes } from "http-status-codes";

interface Response {
  message?: string;
  user?: IUserRegistered;
  token?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserRegistered | Response>
) {
  const isGet = req.method === "GET";
  if (isGet) {
    try {
      const { authorization } = req.headers as { authorization: string };

      const controller = SingInController.init();
      const response = await controller.validateToken(authorization);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const { message, code } = error as CustomError;
      res.status(code || 500).json({ message });
    }
  }
}
