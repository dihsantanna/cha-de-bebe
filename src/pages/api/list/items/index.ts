import type { NextApiRequest, NextApiResponse } from "next";
import { ListController } from "../_list.controller";
import { StatusCodes } from "http-status-codes";
import { Items } from "@prisma/client";
import nc from "next-connect";
import cors from "cors";

interface Response {
  message: string;
}

export default nc<NextApiRequest, NextApiResponse<Response | Items[]>>()
  .use(cors())
  .get(async (_req, res) => {
    try {
      const controller = ListController.init();
      const response = await controller.listMissingItems();
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const { message } = error as Error;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  });
