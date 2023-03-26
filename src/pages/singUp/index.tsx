import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

export default function SingUpForm() {
  const { setLoading } = useLoading();
  const { singUp } = useAuthContext();
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    name: "",
  });

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true, "Cadastrando...");
    try {
      await singUp(user);
      toast.success("Usuário cadastrado com sucesso!");
      router.push("/list");
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-opaque-800 rounded-md m-auto h-96 p-4 text-zinc-800 max-w-sm w-[calc(100vw-20px)] relative z-30 animate-grow-up"
      onSubmit={handleSubmit}
    >
      <fieldset className="w-full h-full flex flex-col justify-between gap-1 border-t border-t-zinc-400 rounded-sm">
        <legend className="font-pacifico font-medium mb-9 text-2xl">
          Registre-se
        </legend>
        <label className="w-full" htmlFor="email">
          Email
          <input
            title="email"
            name="email"
            type="email"
            id="email"
            placeholder="Insira seu e-mail"
            onChange={handleChange}
            className=" w-full px-2 py-1 placeholder:text-zinc-700"
          />
        </label>
        <label className="w-full" htmlFor="name">
          Nome
          <input
            title="nome"
            name="name"
            type="text"
            id="name"
            placeholder="Insira seu Nome"
            onChange={handleChange}
            className="w-full px-2 py-1 placeholder:text-zinc-700"
          />
        </label>
        <button
          className="text-green-600 border border-green-600 px-2 py-2 hover:bg-green-600 hover:text-zinc-900 font-semibold transition-colors duration-300 rounded-sm mt-2"
          type="submit"
        >
          Cadastrar
        </button>
      </fieldset>
    </form>
  );
}
