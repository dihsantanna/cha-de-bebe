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
    username: "",
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
      className="bg-opaque-800 rounded-md m-auto h-96 p-4 text-zinc-800 max-w-sm w-[calc(100vw-20px)] relative z-30 animate-grow-up"
      onSubmit={handleSubmit}
    >
      <fieldset className="w-full h-full flex flex-col justify-between gap-1 border-t border-t-zinc-400 rounded-sm">
        <legend className="font-pacifico font-medium mb-9 text-2xl">
          Registre-se
        </legend>
        <label className="w-full" htmlFor="username">
          Email ou DDD + Celular
          <input
            title="Email ou DDD + Celular"
            name="username"
            type="text"
            id="username"
            placeholder="Insira seu e-mail ou DDD , + Celular"
            onChange={handleChange}
            value={user.username}
            className=" w-full px-2 py-1 placeholder:text-zinc-700"
          />
           <div className="w-full text-sm italic text-zinc-700 py-1">ex: email@email.com ou 21987654321</div>
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
            value={user.name}
            className="w-full px-2 py-1 placeholder:text-zinc-700"
          />
          <div className="w-full text-sm italic text-zinc-700 py-1">ex: Rafael Sant'Anna</div>
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
