import { LazyLoader } from "@/Ui/LazyLoder";

const ScamAnalyticsPlatform=LazyLoader(()=>import("@/DashboardComponents/Admin/ScamAnalyticsPlatform")) ;

const AnalyticsPage = () => {
  return (
    <div>
        <ScamAnalyticsPlatform/>
    </div>
  );
};

export default AnalyticsPage;