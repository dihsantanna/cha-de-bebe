import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import nookies from "nookies";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

export const setTokenInCookies = (
  ctx:
    | Pick<NextPageContext, "res">
    | {
        res: NextApiResponse<any>;
      }
    | null,
  token: string
) => {
  nookies.set(ctx, USER_TOKEN, token, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
};

export const getTokenFromCookies = (
  ctx:
    | Pick<NextPageContext, "req">
    | {
        req: NextApiRequest;
      }
    | null
) => {
  const cookies = nookies.get(ctx);
  return cookies[USER_TOKEN];
};

export const deleteTokenCookies = async (
  ctx:
    | Pick<NextPageContext, "res">
    | {
        res: NextApiResponse<any>;
      }
    | null
) => {
  nookies.destroy(ctx, USER_TOKEN);
};
