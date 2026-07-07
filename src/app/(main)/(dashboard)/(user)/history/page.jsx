import { LazyLoader } from "@/Ui/LazyLoder";

const ScanHistoryPage=LazyLoader(()=>import("@/DashboardComponents/user/ScanHistoryPage")) ;

const HistoryPage = () => {
  return (
    <div>
        <ScanHistoryPage/>
    </div>
  );
};

export default HistoryPage;