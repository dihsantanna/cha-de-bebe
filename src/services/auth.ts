import { IUser, IUserRegistered } from "@/types/IUser";
import { api, setToken } from "./api";

type AuthResponse = {
  token: string;
  user: IUserRegistered;
};

export async function singInRequest(username: string) {
  const { data } = await api.post<Promise<AuthResponse>>("/api/singIn", {
    username,
  });
  return data;
}

export async function singUpRequest({ name, username }: IUser) {
  const { data } = await api.post<Promise<AuthResponse>>("/api/singUp", {
    name,
    username,
  });
  return data;
}

export async function recoverUserInformation(token: string) {
  setToken(token);
  const { data } = await api.get<Promise<AuthResponse>>("/api/singIn/validate");
  return data;
}
