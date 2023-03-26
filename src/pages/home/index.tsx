import { GetServerSideProps } from "next";
import { Items } from "@prisma/client";
import React from "react";
import { ListMissingItems } from "../../components/ListMissingItems";
import { api } from "@/services/api";
import { parseCookies } from "nookies";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

interface HomeProps {
  items: Items[];
}

export default function Home({ items }: HomeProps) {
  return (
    <section className="flex flex-col mt-3 justify-center items-center gap-1 h-[calc(100vh-112px)] relative z-40">
      <div className="text-3xl italic font-pacifico text-green-600 bg-opaque-400 px-2 py-1 rounded-lg">
        Lista do Bebê
      </div>
      <ListMissingItems items={items} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const URL = "/api/list/items";
  const response = await api.get(URL);
  const items = response.data;

  const token = parseCookies(ctx)[USER_TOKEN];
  if (token) {
    return {
      redirect: {
        destination: "/list",
        permanent: false,
      },
    };
  }

  return {
    props: {
      items,
    },
  };
};
