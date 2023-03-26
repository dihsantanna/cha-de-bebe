import { api, setToken } from "@/services/api";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

interface SetItemCheckboxProps {
  itemId: number;
  changeItem: () => void;
  isChecked?: boolean;
  labelId?: string;
}

export function SetItemCheckbox({
  itemId,
  changeItem,
  isChecked,
  labelId,
}: SetItemCheckboxProps) {
  const [checked, setChecked] = useState(!!isChecked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleItem = (id: number) => {
    return async () => {
      setIsLoading(true);
      try {
        const token = parseCookies(null)[USER_TOKEN];
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
      className="cursor-pointer w-4 h-4"
      type="checkbox"
      checked={checked}
      onChange={toggleItem(itemId)}
      id={labelId}
    />
  );
}
