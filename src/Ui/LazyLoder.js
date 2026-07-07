import dynamic from "next/dynamic";

export const LazyLoader = (loader) =>
  dynamic(loader, {
    loading: () => (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ),
  });