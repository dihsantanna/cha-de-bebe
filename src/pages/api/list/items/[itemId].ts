import type { NextApiRequest, NextApiResponse } from "next";
import { ListController } from "../_list.controller";
import { StatusCodes } from "http-status-codes";
import nc from "next-connect";
import cors from "cors";
import { corsOptions } from "../../_utils/_cors.options";

interface Response {
  message: string;
}

export default nc<NextApiRequest, NextApiResponse<Response>>()
  .use(cors(corsOptions))
  .options((req, res) => {
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
  })
  .put(async (req, res) => {
    try {
      const itemId = req.query.itemId as string;
      const token = req.headers.authorization as string;
      const controller = ListController.init();
      const response = await controller.toggleUserItem(+itemId, token);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const { message } = error as Error;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  });
