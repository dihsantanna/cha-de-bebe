import { GetServerSideProps } from "next";
import { Items } from "@prisma/client";
import axios from "axios";
import React from "react";
import { ListMissingItems } from "../components/ListMissingItems";

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const response = await axios.get(
    `${isProduction ? "https://" : "http://"}${
      context.req.headers.host
    }/api/list/items`
  );
  const items = response.data;

  return {
    props: {
      items,
    },
  };
};
