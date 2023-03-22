import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

export function SingUpForm() {
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
    try {
      const response = await axios.post<{ message: string; token: string }>(
        "/api/singUp/",
        user
      );

      const { data } = response;

      localStorage.setItem("token", data.token);

      toast.success(data.message);
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Error).message);
    }
  };

  return (
    <form
      className="flex flex-wrap gap-1 max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <label className="text-zinc-200" htmlFor="email">
        Email
      </label>
      <input
        title="email"
        name="email"
        type="email"
        id="email"
        placeholder="Insira seu e-mail"
        onChange={handleChange}
        className="w-full px-2 py-1"
      />
      <label className="text-zinc-200" htmlFor="name">
        Nome
      </label>
      <input
        title="nome"
        name="name"
        type="text"
        id="name"
        placeholder="Insira seu Nome"
        onChange={handleChange}
        className="w-full px-2 py-1"
      />
      <button
        className="text-violet-500 border border-violet-500 px-2 py-1 hover:bg-violet-500 hover:text-zinc-900 font-semibold transition-colors duration-300 rounded-sm mt-2"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
