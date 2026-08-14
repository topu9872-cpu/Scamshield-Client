import { LazyLoader } from "@/Ui/LazyLoder";

const Sidebar = LazyLoader(
  () => import("@/DashboardComponents/Sidebar/Sidebar"),
);

const LayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      <Sidebar />

      <main className="flex-1 p-4 md:p-0 md:pl-5 md:py-5 md:pr-5 min-w-0">
        <div className="w-full h-full border border-zinc-900 md:border-zinc-800 rounded-2xl p-4 md:p-6 bg-zinc-950/20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutPage;
