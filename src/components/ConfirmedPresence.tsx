import { useAuthContext } from "@/context/AuthContext";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export function ConfirmedPresence() {
  const { user, toggleConfirmedPresence } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmedPresence = async () => {
    setIsLoading(true);
    try {
      await toggleConfirmedPresence();
      toast.success("Presença alterada com sucesso!");
    } catch (error) {
      const { message } = (error as AxiosError).response?.data as Error;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-12 relative">
      <label
        htmlFor="confirmedPresence"
        className="relative z-50 w-80 flex items-center justify-center gap-2 h-full cursor-pointer"
      >
        <div className="rounded-full w-full absolute top-0 left-0 h-12 animate-pulse bg-green-300 z-10"></div>
        <h2 className="text-xl font-pacifico relative z-50">
          Confirme sua presença aqui:
        </h2>
        {isLoading ? (
          <FaSpinner className="animate-loading w-4 h-4" />
        ) : (
          <input
            type="checkbox"
            name="confirmedPresence"
            id="confirmedPresence"
            className="relative z-50 mt-1 cursor-pointer w-4 h-4"
            checked={user?.confirmedPresence}
            onChange={handleConfirmedPresence}
          />
        )}
      </label>
    </div>
  );
}
