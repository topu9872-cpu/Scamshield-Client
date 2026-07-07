import { LazyLoader } from "@/Ui/LazyLoder";

 const SettingsPanel =LazyLoader(()=>import("@/DashboardComponents/Admin/SettingsPanel")) ;

const SerringsPage = () => {
  return (
    <div>
        <SettingsPanel/>
    </div>
  );
};

export default SerringsPage;