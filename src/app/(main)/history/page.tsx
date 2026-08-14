import { getScanHistory } from "@/app/api/serverAction";
import { UserData } from "@/lib/UserData";
import { LazyLoader } from "@/Ui/LazyLoder";

const ScanHistoryPage=LazyLoader(()=>import("@/DashboardComponents/user/ScanHistoryPage")) ;

const HistoryPage =async () => {
  const user=await UserData()
  const scanHistory=await getScanHistory(user?.email)
  return (
    <div>
        <ScanHistoryPage scanHistory={scanHistory}/>
    </div>
  );
};

export default HistoryPage;