import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export function Header() {
  const router = useRouter();

  const isSingUp = router.pathname === "/singUp";

  const showSingButton = router.pathname !== "/list";
  return (
    <header className="w-full h-28 py-4 bg-zinc-900 flex items-center justify-between flex-col gap-2">
      <h1 className="text-4xl text-zinc-200 italic font-pacifico">
        Chá de Bebê
      </h1>
      <div className="w-full flex justify-center">
        {showSingButton ? (
          <Link
            className="flex justify-center items-center text-green-500 font-semibold border border-green-600 hover:bg-green-600 hover:text-zinc-900 transition-colors duration-300 rounded-sm mr-2"
            href={isSingUp ? "/singIn" : "/singUp"}
          >
            <span className="animate-pulse w-full h-full py-1 px-2 hover:animate-none">
              {isSingUp ? "Entre na sua lista aqui" : "Registre-se aqui"}
            </span>
          </Link>
        ) : (
          <span className="flex justify-end text-green-500 font-semibold italic mr-2">
            Lista de presentes
          </span>
        )}
      </div>
    </header>
  );
}
