import { ListMissingItems } from "@/components/ListMissingItems";
import { ListUserItems } from "@/components/ListUserItems";
import { useAuthContext } from "@/context/AuthContext";
import { api, setToken } from "@/services/api";
import { recoverUserInformation } from "@/services/auth";
import { deleteTokenCookies, getTokenFromCookies } from "@/utils/handleCookies";
import { Items } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

interface ListProps {
  items: Items[];
  userItems: Items[];
}

export default function List({
  items: itemList,
  userItems: userItemsList,
}: ListProps) {
  const { isAuthenticated } = useAuthContext();
  const [items, setItems] = useState<Items[]>(itemList);
  const [userItems, setUserItems] = useState<Items[]>(userItemsList);

  const refreshItems = async () => {
    const LIST_URL = "/api/list/items";
    const USER_LIST_URL = "/api/list/user";
    const token = getTokenFromCookies(null);
    setToken(token);
    const [listResponse, userListResponse] = await Promise.all([
      api.get(LIST_URL),
      api.get(USER_LIST_URL),
    ]);
    setItems(listResponse.data);
    setUserItems(userListResponse.data);
  };

  return (
    <>
      {isAuthenticated && (
        <div className="mx-auto py-6 w-11/12 bg-opaque-600 relative z-40 h-[calc(100vh-112px)] overflow-y-auto scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-900">
          <section className="mx-auto rounded-b-lg flex flex-col items-center justify-center gap-6 max-w-xl p-2 text-zinc-900 relative z-40">
            <div className="text-center">
              <strong className="font-semibold text-lg">Obs</strong>: Fraldas
              Descartáveis (somente Babysec, Pom Pom, Pampers e Huggies)
            </div>
            <div className="text-center">
              <strong className="font-bold text-lg">Priorizar Cores:</strong>
              <ul className="flex">
                <li className="ml-1 w-max text-green-500 text-stroke-zinc font-bold">
                  verde
                </li>
                ,
                <li className="ml-1 w-max text-amber-400 text-stroke-zinc font-bold">
                  amarelo
                </li>
                ,
                <li className="ml-1 w-max text-white text-stroke-zinc font-bold">
                  branco
                </li>
                ,
                <li className="mx-1 w-max text-orange-900 text-stroke-zinc font-bold">
                  marrom
                </li>
                ou
                <li className="ml-1 w-max text-gray-600 text-stroke-zinc font-bold">
                  cinza
                </li>
                .
              </ul>
            </div>
          </section>
          <section className="h-max relative z-40 py-6">
            <div className="h-max flex flex-col items-center py-2 rounded-lg w-11/12 mx-auto">
              <h2 className="text-zinc-900 font-pacifico text-2xl mb-1">
                Minha lista:
              </h2>
              <ListUserItems
                userItems={userItems}
                refreshItems={refreshItems}
              />
            </div>
            <div className="h-max flex flex-col items-center py-2 rounded-lg w-11/12 mx-auto">
              <h2 className="text-zinc-900 font-pacifico text-2xl mb-1">
                Lista do Bebê:
              </h2>
              <ListMissingItems items={items} refreshItems={refreshItems} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getTokenFromCookies(ctx);
  try {
    if (!token) {
      if (ctx.req.url === "/list") {
        deleteTokenCookies(ctx);
        return {
          redirect: {
            destination: "/singIn",
            permanent: false,
          },
        };
      }
    }

    recoverUserInformation(token);
  } catch (error) {
    if (ctx.req.url === "/list") {
      deleteTokenCookies(ctx);
      return {
        redirect: {
          destination: "/singIn",
          permanent: false,
        },
      };
    }
  }

  const LIST_URL = "/api/list/items";
  const USER_LIST_URL = "/api/list/user";
  const [{ data: items }, { data: userItems }] = await Promise.all([
    api.get(LIST_URL),
    (async () => {
      setToken(token);
      return await api.get(USER_LIST_URL);
    })(),
  ]);

  return {
    props: {
      items,
      userItems,
    },
  };
};
