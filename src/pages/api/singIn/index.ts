// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUserRegistered } from "@/types/IUser";
import { CustomError } from "@/utils/CustomError";
import type { NextApiRequest, NextApiResponse } from "next";
import { SingInController } from "./_singIn.controller";
import { StatusCodes } from "http-status-codes";
import nc from "next-connect";
import cors from "cors";

interface Response {
  message?: string;
  token?: string;
  user?: IUserRegistered;
}
export default nc<NextApiRequest, NextApiResponse<Response>>()
  .use(cors())
  .post(async (req, res) => {
    try {
      const { email } = req.body as { email: string };

      const controller = SingInController.init(email);
      const response = await controller.singIn();

      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      const { message, code } = error as CustomError;
      res.status(code || 500).json({ message });
    }
  });
