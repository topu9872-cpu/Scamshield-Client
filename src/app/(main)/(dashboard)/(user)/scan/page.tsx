import { LazyLoader } from "@/Ui/LazyLoder";

const ScamScanner=LazyLoader(()=>import("@/DashboardComponents/user/ScamScanner")) ;

const ScanPage = () => {
  return (
    <div>
        <ScamScanner/>
    </div>
  );
};

export default ScanPage;