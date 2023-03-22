import React from "react";

export function SingInForm() {
  return (
    <form className="w-full flex flex-col items-center gap-3">
      <input
        className="w-full max-w-sm px-2 py-1"
        type="text"
        placeholder="Digite seu email aqui"
      />
      <button
        className="text-violet-500 border border-violet-500 px-2 py-1 hover:bg-violet-500 hover:text-zinc-900 font-semibold transition-colors duration-300 rounded-sm"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}
