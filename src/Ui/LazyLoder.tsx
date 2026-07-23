// @ts-nocheck
import dynamic from "next/dynamic";
import React from "react";

export const LazyLoader = (loader: any) =>
  dynamic(loader, {
    loading: () => (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ),
  });