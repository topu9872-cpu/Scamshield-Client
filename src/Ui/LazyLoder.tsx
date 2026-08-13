import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const LazyLoader = <P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>
) =>
  dynamic<P>(loader, {
    loading: () => (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ),
  });