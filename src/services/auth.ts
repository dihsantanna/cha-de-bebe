import { IUser, IUserRegistered } from "@/types/IUser";
import { api, setToken } from "./api";

type AuthResponse = {
  token: string;
  user: IUserRegistered;
};

export async function singInRequest(email: string) {
  const { data } = await api.post<Promise<AuthResponse>>("/api/singIn", {
    email,
  });
  return data;
}

export async function singUpRequest({ name, email }: IUser) {
  const { data } = await api.post<Promise<AuthResponse>>("/api/singUp", {
    name,
    email,
  });
  return data;
}

export async function recoverUserInformation(token: string) {
  setToken(token);
  const { data } = await api.get<Promise<AuthResponse>>("/api/singIn/validate");
  return data;
}
