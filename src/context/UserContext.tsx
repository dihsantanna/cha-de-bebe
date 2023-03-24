import { IUserRegistered } from "@/types/IUser";
import React, { createContext, useState, useContext } from "react";

interface UserContextType {
  user: IUserRegistered;
  setUser: (user: IUserRegistered) => void;
  userItems: number[];
  addUserItems: (userItem: number) => void;
  deleteUserItem: (userItem: number) => void;
}

interface UserContextProps {
  children: React.ReactNode;
}

export const context = createContext<UserContextType>({} as UserContextType);

export function UserContext({ children }: UserContextProps) {
  const [user, setUser] = useState({} as IUserRegistered);
  const [userItems, setUserItems] = useState<number[]>([]);

  const addUserItems = (userItem: number) => {
    setUserItems([...userItems, userItem]);
  };

  const deleteUserItem = (userItem: number) => {
    setUserItems(userItems.filter((item) => item !== userItem));
  };

  return (
    <context.Provider
      value={{
        user,
        setUser,
        userItems,
        addUserItems,
        deleteUserItem,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useUserContext() {
  return useContext(context);
}
