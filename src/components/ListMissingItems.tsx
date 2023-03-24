import { Items } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";

interface ListMissingItemsProps {
  items: Items[];
}

export function ListMissingItems({ items }: ListMissingItemsProps) {
  const router = useRouter();
  const isList = router.pathname === "/list";
  return (
    <div className="max-xl: w-11/12 mx-auto border-2 border-zinc-200 rounded-lg relative z-40 max-h-[75%]">
      <div className="bg-zinc-900 rounded-t-lg text-xl h-7">
        <span className="flex items-center justify-center font-semibold text-zinc-200">
          Item
        </span>
        {isList && (
          <span className="flex items-center justify-center font-semibold">
            Selecionar
          </span>
        )}
      </div>
      <div className="bg-opaque-500 overflow-y-auto h-[calc(100%-28px)] scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-900">
        {items.map(({ id, item }, index) => (
          <div
            key={id}
            className={`${
              index % 2 === 0 ? "bg-opaque-500" : "bg-silver-opaque-500"
            }`}
          >
            <span className="text-zinc-900 flex items-center justify-center text-center text-lg font-medium px-2 py-1">
              {item}
            </span>
            {isList && (
              <span className="flex items-center justify-center text-center text-lg px-2 py-1">
                Selecionar
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
