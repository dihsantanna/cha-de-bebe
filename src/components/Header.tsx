import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { deleteTokenCookies } from "@/utils/handleCookies";
import { useAuthContext } from "@/context/AuthContext";

export function Header() {
  const router = useRouter();
  const [aName, setAName] = useState("");
  const [name, setName] = useState("");

  const { user, isAuthenticated, logout } = useAuthContext();

  const isSingUp = router.pathname === "/singUp";

  const isHome = router.pathname === "/home";

  const showSingButton = router.pathname !== "/list";

  const isList = !showSingButton;

  const getUserName = useCallback(() => {
    if (isList) {
      if (user?.name) {
        const [firstName] = user.name.split(" ");

        setName(firstName);
      }
    }
  }, [isList, user]);

  useEffect(() => {
    setAName(process.env.NEXT_PUBLIC_A_NAME as string);
    getUserName();
  }, [getUserName]);

  return (
    <header className="w-full h-28 py-4 bg-zinc-900 flex items-center justify-between flex-col gap-2 relative z-40">
      {isList && isAuthenticated && (
        <>
          <div className="absolute text-zinc-200 text-base left-3 bottom-3">
            <p>Seja bem-vindo(a)</p>
            <p className="font-semibold italic text-green-500">{name}!</p>
          </div>
          <div className="absolute text-zinc-200 text-sm right-4 top-4">
            <button
              className="border font-semibold border-green-600 rounded-sm px-2 hover:bg-green-600 hover:text-zinc-900 transition-colors duration-300"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        </>
      )}
      <h1 className="text-4xl text-zinc-200 italic font-pacifico">
        Chá de Bebê
      </h1>
      <div className="w-full flex justify-center">
        {showSingButton && !isAuthenticated ? (
          <Link
            className="flex justify-center items-center text-green-500 font-semibold border border-green-600 hover:bg-green-600 hover:text-zinc-900 transition-colors duration-300 rounded-sm mr-2"
            href={isSingUp || isHome ? "/singIn" : "/singUp"}
          >
            <span className="animate-pulse w-full h-full py-1 px-2 hover:animate-none">
              {isSingUp || isHome
                ? "Entre na sua lista aqui"
                : "Registre-se aqui"}
            </span>
          </Link>
        ) : (
          <span className="flex justify-end text-transparent text-lg font-semibold italic mr-2">
            {aName}
          </span>
        )}
      </div>
    </header>
  );
}
