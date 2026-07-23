import { LazyLoader } from "@/Ui/LazyLoder";

const ScamReportsDashboard =LazyLoader(()=> import("@/DashboardComponents/Admin/ScamReportsDashboard")) ;

const ReportsPage = () => {
  return (
    <div>
        <ScamReportsDashboard/>
    </div>
  );
};

export default ReportsPage;