import React, { createContext, useState, useContext } from "react";

interface LoadContextType {
  loading: boolean;
  loadingText: string;
  setLoading: (loading: boolean, loadingText?: string) => void;
}

interface LoadingContextProps {
  children: React.ReactNode;
}

export const context = createContext<LoadContextType>({} as LoadContextType);

export default function LoadingContext({ children }: LoadingContextProps) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Carregando...");

  const handleLoading = (isLoading: boolean, text?: string) => {
    setLoadingText(text ? text : "Carregando...");
    setLoading(isLoading);
  };

  return (
    <context.Provider
      value={{
        loading,
        setLoading: handleLoading,
        loadingText,
      }}
    >
      {children}
    </context.Provider>
  );
}

export const useLoading = () => {
  const contextValue = useContext(context);

  return contextValue;
};
