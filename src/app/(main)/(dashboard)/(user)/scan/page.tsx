import { UserData } from "@/lib/UserData";
import { LazyLoader } from "@/Ui/LazyLoder";

const ScamScanner=LazyLoader(()=>import("@/DashboardComponents/user/ScamScanner")) ;

const ScanPage = async() => {
  const user=await UserData()
  return (
    <div>
        <ScamScanner user={user}/>
    </div>
  );
};

export default ScanPage;