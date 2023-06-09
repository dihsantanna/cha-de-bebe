import { Items } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { SetItemCheckbox } from "./SetItemCheckbox";

interface ListUserItemsProps {
  userItems: Items[];
  refreshItems?: () => void;
}

export function ListUserItems({ userItems, refreshItems }: ListUserItemsProps) {
  return (
    <div className="max-w-3xl w-full mx-auto border-2 border-zinc-200 rounded-lg relative z-40 h-[500px]">
      <div className="bg-zinc-900 rounded-t-lg text-lg h-7 flex justify-center items-center text-zinc-200">
        <span className="flex items-center justify-center font-semibold w-[61%]">
          Item
        </span>
        <span className="flex items-center justify-center w-[39%] h-full text-center font-semibold text-lg px-2 py-1">
          Desmarcar
        </span>
      </div>
      <div className="bg-opaque-500 overflow-y-auto h-[calc(100%-28px)] w-full scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-900">
        {userItems.map(({ id, item }, index) => (
          <div
            key={id}
            className={`flex justify-center items-center h-max hover:bg-red-100 cursor-pointer ${
              index % 2 === 0 ? "bg-opaque-500" : "bg-silver-opaque-500 py-6"
            }`}
          >
            <label
              htmlFor={`${id}`}
              className="cursor-pointer text-zinc-900 flex items-center justify-center h-full text-center text-lg font-medium px-2 py-1 w-[61%]"
            >
              {item}
            </label>
            <span className="flex items-center justify-center w-[39%] h-full text-center text-lg px-2 py-1">
              <SetItemCheckbox
                itemId={id}
                changeItem={refreshItems!}
                isChecked
                labelId={`${id}`}
              />
            </span>
          </div>
        ))}
        {!userItems.length && (
          <div className="gap-4 flex flex-col justify-center items-center h-full text-center font-pacifico text-lg">
            Escolha um item na lista do bebê!
            <br />
            Nos ajude a completar a lista.
            <Image
              src="/baby_elephant_thanks.png"
              width={0}
              height={0}
              sizes="100vw"
              alt="Elefante agradecendo"
              className="opacity-70 w-[200px] h-[200px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
