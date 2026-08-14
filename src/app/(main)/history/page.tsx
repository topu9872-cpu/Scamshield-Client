import { UserData } from "@/lib/UserData";
import { LazyLoader } from "@/Ui/LazyLoder";

const ScanHistoryPage = LazyLoader(
  () => import("@/DashboardComponents/user/ScanHistoryPage"),
);

const HistoryPage = async () => {
  const user = await UserData();

  return (
    <div>
      <ScanHistoryPage user={user} />
    </div>
  );
};

export default HistoryPage;
