import { useLoading } from "@/context/LoadingContext";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";

export default function SingInForm() {
  const { setLoading } = useLoading();
  const { singIn } = useAuthContext();
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setEmail(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true, "Entrando...");
    try {
      await singIn(email);
      toast.success("Entrou com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error(
        ((error as AxiosError).response?.data as Error).message ||
          (error as Error).message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-opaque-800 rounded-md m-auto h-64 p-4 text-zinc-800 max-w-sm w-[calc(100vw-20px)] relative z-30 animate-grow-up"
      onSubmit={handleSubmit}
    >
      <fieldset className="w-full h-full flex flex-col justify-between gap-1 border-t border-t-zinc-400 rounded-sm">
        <legend className="font-pacifico font-medium mb-9 text-2xl">
          Entre na sua lista
        </legend>
        <label className="w-full" htmlFor="email">
          Email
          <input
            title="email"
            name="email"
            type="email"
            placeholder="Digite seu email aqui"
            value={email}
            onChange={handleChange}
            className=" w-full px-2 py-1 placeholder:text-zinc-700"
          />
        </label>
        <button
          className="text-green-600 border border-green-600 px-2 py-2 hover:bg-green-600 hover:text-zinc-900 font-semibold transition-colors duration-300 rounded-sm mt-2"
          type="submit"
        >
          Entrar
        </button>
      </fieldset>
    </form>
  );
}
