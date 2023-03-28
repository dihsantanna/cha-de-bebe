import { CustomError } from "@/utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import cors from "cors";
import { ListController } from "../_list.controller";
import { Items } from "@prisma/client";
import { corsOptions } from "../../_utils/_cors.options";

interface Response {
  message?: string;
}

export default nc<NextApiRequest, NextApiResponse<Response | Items[]>>()
  .use(cors(corsOptions))
  .options((req, res) => {
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
  })
  .get(async (req, res) => {
    try {
      const token = req.headers.authorization as string;
      const controller = ListController.init();
      const response = await controller.listUserItems(token);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const { message, code } = error as CustomError;
      res.status(code || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  });
