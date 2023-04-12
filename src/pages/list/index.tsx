import { ConfirmedPresence } from "@/components/ConfirmedPresence";
import { ListMissingItems } from "@/components/ListMissingItems";
import { ListUserItems } from "@/components/ListUserItems";
import { useAuthContext } from "@/context/AuthContext";
import { api, setToken } from "@/services/api";
import { recoverUserInformation } from "@/services/auth";
import { Items } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { Notes } from "@/components/Notes";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

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
    const token = parseCookies(null)[USER_TOKEN];
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
          <ConfirmedPresence />
          <section className="mx-auto rounded-b-lg flex flex-col items-center justify-center gap-6 max-w-xl p-2 text-zinc-900 relative z-40">
            <Notes />
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
  const token = parseCookies(ctx)[USER_TOKEN];
  try {
    if (!token) {
      if (ctx.req.url === "/list") {
        destroyCookie(ctx, USER_TOKEN);
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
      destroyCookie(ctx, USER_TOKEN);
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
