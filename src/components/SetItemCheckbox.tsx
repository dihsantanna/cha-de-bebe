import { api, setToken } from "@/services/api";
import { getTokenFromCookies } from "@/utils/handleCookies";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

interface SetItemCheckboxProps {
  itemId: number;
  changeItem: () => void;
  isChecked?: boolean;
}

export function SetItemCheckbox({
  itemId,
  changeItem,
  isChecked,
}: SetItemCheckboxProps) {
  const [checked, setChecked] = useState(!!isChecked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleItem = (id: number) => {
    return async () => {
      setIsLoading(true);
      try {
        const token = getTokenFromCookies(null);
        setToken(token);
        await api.put(`/api/list/items/${id}`);
        setChecked(!checked);
        changeItem();
        toast.success(
          `Item ${checked ? "removido" : "adicionado"} com sucesso!`
        );
      } catch (error) {
        const { message } = (error as AxiosError).response
          ?.data as unknown as Error;
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
  };

  return isLoading ? (
    <FaSpinner className="animate-loading w-4 h-4" />
  ) : (
    <input
      className="cursor-pointer"
      type="checkbox"
      checked={checked}
      onChange={toggleItem(itemId)}
    />
  );
}
