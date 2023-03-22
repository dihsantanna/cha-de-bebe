import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export function SingInForm() {
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setEmail(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/singIn/", { email });
      const { data } = response;
      localStorage.setItem("token", data.token);

      toast.success(data.message);
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-3"
    >
      <input
        className="w-full max-w-sm px-2 py-1"
        type="text"
        placeholder="Digite seu email aqui"
        value={email}
        onChange={handleChange}
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
