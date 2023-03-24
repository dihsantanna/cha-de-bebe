import { useAuthContext } from "@/context/AuthContext";
import { recoverUserInformation } from "@/services/auth";
import { deleteTokenCookies, getTokenFromCookies } from "@/utils/handleCookies";
import { GetServerSideProps } from "next";
import React from "react";

export default function List() {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      {isAuthenticated && (
        <section className="flex flex-col items-center justify-center gap-6 max-w-xl p-2 text-zinc-900">
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
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("context", ctx.req.url);
  try {
    const token = getTokenFromCookies(ctx);

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

  return {
    props: {},
  };
};
