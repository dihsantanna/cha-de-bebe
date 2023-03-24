import type { NextApiRequest, NextApiResponse } from "next";
import { ListController } from "../_list.controller";
import { StatusCodes } from "http-status-codes";
import { Items } from "@prisma/client";

interface Response {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Items[] | Response>
) {
  const isGet = req.method === "GET";
  if (isGet) {
    try {
      const controller = ListController.init();
      const response = await controller.listMissingItems();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const { message } = error as Error;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
