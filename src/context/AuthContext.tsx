import {
  singInRequest,
  recoverUserInformation,
  singUpRequest,
} from "@/services/auth";
import { IUser, IUserRegistered } from "@/types/IUser";
import {
  deleteTokenCookies,
  getTokenFromCookies,
  setTokenInCookies,
} from "@/utils/handleCookies";
import axios from "axios";
import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useLoading } from "./LoadingContext";

interface AuthContextType {
  user: IUserRegistered | null;
  singIn: (email: string) => Promise<void>;
  singUp: (user: IUser) => Promise<void>;
  logout: () => void;
  userItems: number[];
  addUserItems: (userItem: number) => void;
  deleteUserItem: (userItem: number) => void;
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
  const [userItems, setUserItems] = useState<number[]>([]);
  const { setLoading } = useLoading();

  const isAuthenticated = !!user;

  const router = useRouter();

  const singIn = async (email: string) => {
    const { token, user: userRegistered } = await singInRequest(email);
    setTokenInCookies(null, token);
    setUser(userRegistered);
    router.push("/list");
  };

  const singUp = async ({ name, email }: IUser) => {
    const { token, user: userRegistered } = await singUpRequest({
      name,
      email,
    });
    setUser(userRegistered);
    setTokenInCookies(null, token);
    router.push("/list");
  };

  const logout = () => {
    router.push("/");
    setLoading(true, "Saindo...");
    deleteTokenCookies(null);
    setUser(null);
    setUserItems([]);
    setLoading(false);
  };

  useEffect(() => {
    const userToken = getTokenFromCookies(null);
    const isList = router.pathname === "/list";
    if (userToken) {
      recoverUserInformation(userToken)
        .then(({ user, token }) => {
          setTokenInCookies(null, token);
          setUser(user);
          if (!isList) router.push("/list");
        })
        .catch(() => {
          if (isList) router.push("/singIn");
          deleteTokenCookies(null);
        });
    } else {
      if (isList) router.push("/singIn");
      deleteTokenCookies(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUserItems = (userItem: number) => {
    setUserItems([...userItems, userItem]);
  };

  const deleteUserItem = (userItem: number) => {
    setUserItems(userItems.filter((item) => item !== userItem));
  };

  return (
    <authContext.Provider
      value={{
        user,
        singIn,
        singUp,
        logout,
        userItems,
        addUserItems,
        deleteUserItem,
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
