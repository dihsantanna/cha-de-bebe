import React, { useState } from "react";
import { SingInForm } from "./SingInForm";
import { SingUpForm } from "./SingUpForm";

export function Header() {
  const [singUp, setSingUp] = useState(false);
  return (
    <header className="w-full h-80 py-2 bg-zinc-900 flex items-center justify-between flex-col gap-4">
      <h1 className="text-3xl text-zinc-200 italic">Chá de Bebê do Rafael</h1>
      <div className="w-3/4">{singUp ? <SingUpForm /> : <SingInForm />}</div>
      <div className="w-full flex justify-end">
        <button
          className="flex justify-end text-green-500 font-semibold border border-green-600 hover:bg-green-600 hover:text-zinc-900 transition-colors duration-300 rounded-sm mr-2"
          onClick={() => setSingUp(!singUp)}
        >
          <span className="animate-pulse w-full h-full py-1 px-2 hover:animate-none">
            {singUp
              ? "Clique aqui para fazer o login"
              : "Clique aqui para se cadastrar"}
          </span>
        </button>
      </div>
    </header>
  );
}
