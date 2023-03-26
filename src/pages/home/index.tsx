import { GetStaticProps } from "next";
import { Items } from "@prisma/client";
import React from "react";
import { ListMissingItems } from "../../components/ListMissingItems";
import { api } from "@/services/api";

interface HomeProps {
  items: Items[];
}

export default function Home({ items }: HomeProps) {
  return (
    <section className="flex flex-col justify-evenly items-center gap-4 h-[calc(100vh-112px)] relative z-40">
      <div className="text-3xl italic font-pacifico text-green-600 bg-opaque-400 px-2 py-1 rounded-lg">
        Lista do Bebê
      </div>
      <ListMissingItems items={items} />
    </section>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (_ctx) => {
  const URL = "/api/list/items";
  const response = await api.get(URL);
  const items = response.data;

  return {
    props: {
      items,
    },
    revalidate: (60 * 60) / 6, // 10 minutes
  };
};
