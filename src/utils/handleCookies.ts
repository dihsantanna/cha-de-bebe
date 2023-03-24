import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { setCookie, parseCookies, destroyCookie } from "nookies";

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
  setCookie(ctx, USER_TOKEN, token, {
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
  const cookies = parseCookies(ctx);
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
  destroyCookie(ctx, USER_TOKEN);
};
