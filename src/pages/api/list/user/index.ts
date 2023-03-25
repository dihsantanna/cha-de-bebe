import { CustomError } from "@/utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { ListController } from "../_list.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const isGet = req.method === "GET";
    if (isGet) {
      const token = req.headers.authorization as string;
      const controller = ListController.init();
      const response = await controller.listUserItems(token);
      res.status(StatusCodes.OK).json(response);
    }
  } catch (error) {
    const { message, code } = error as CustomError;
    res.status(code || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
}
