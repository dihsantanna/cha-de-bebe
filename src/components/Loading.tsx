import { useLoading } from "@/context/LoadingContext";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export function Loading() {
  const { loading, loadingText } = useLoading();
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-50 bg-opaque-700 w-screen h-screen flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center justify-center gap-6">
            <span className="text-zinc-900 text-3xl font-pacifico">
              {loadingText}
            </span>
            <FaSpinner className="animate-loading w-6 h-6" />
          </div>
        </div>
      )}
    </>
  );
}
