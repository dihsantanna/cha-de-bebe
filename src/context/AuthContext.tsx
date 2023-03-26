import { api, setToken } from "@/services/api";
import {
  singInRequest,
  recoverUserInformation,
  singUpRequest,
} from "@/services/auth";
import { IUser, IUserRegistered } from "@/types/IUser";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLoading } from "./LoadingContext";
import { setCookie, destroyCookie, parseCookies } from "nookies";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

const cookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
};

interface AuthContextType {
  user: IUserRegistered | null;
  singIn: (email: string) => Promise<void>;
  singUp: (user: IUser) => Promise<void>;
  logout: () => void;
  toggleConfirmedPresence: () => Promise<void>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const authContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUserRegistered | null>(null);
  const { setLoading } = useLoading();

  const isAuthenticated = !!user;

  const router = useRouter();

  const singIn = async (email: string) => {
    const { token, user: userRegistered } = await singInRequest(email);
    setCookie(null, USER_TOKEN, token, cookieOptions);
    setUser(userRegistered);
    router.push("/list");
  };

  const singUp = async ({ name, email }: IUser) => {
    const { token, user: userRegistered } = await singUpRequest({
      name,
      email,
    });
    setUser(userRegistered);
    setCookie(null, USER_TOKEN, token, cookieOptions);
    router.push("/list");
  };

  const toggleConfirmedPresence = async () => {
    const token = parseCookies(null)[USER_TOKEN];
    setToken(token);
    await api.patch(`/api/user/confirmedPresence`);
    setUser((prevState) => ({
      ...prevState!,
      confirmedPresence: !prevState!.confirmedPresence,
    }));
  };

  const logout = () => {
    router.push("/");
    setLoading(true, "Saindo...");
    destroyCookie(null, USER_TOKEN);
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const userToken = parseCookies(null)[USER_TOKEN];
    const isList = router.pathname === "/list";
    if (userToken) {
      recoverUserInformation(userToken)
        .then(({ user, token }) => {
          setCookie(null, USER_TOKEN, token, cookieOptions);
          setUser(user);
          if (!isList) router.push("/list");
        })
        .catch(() => {
          if (isList) router.push("/singIn");
          destroyCookie(null, USER_TOKEN);
        });
    } else {
      if (isList) router.push("/singIn");
      destroyCookie(null, USER_TOKEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        singIn,
        singUp,
        logout,
        toggleConfirmedPresence,
        isAuthenticated,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(authContext);
}
