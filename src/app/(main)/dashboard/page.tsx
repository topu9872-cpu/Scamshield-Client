import { getScanHistoryPaginated } from "@/app/api/serverAction";
import { UserData } from "@/lib/UserData";
import { LazyLoader } from "@/Ui/LazyLoder";

const UserDashboardOverview =LazyLoader(()=>import("@/DashboardComponents/user/UserDashboardOverview")) ;

const UserDashboardpage =async () => {
  const user=await UserData()
  const historyDetails=await getScanHistoryPaginated(user?.email)
  return (
    <div>
        <UserDashboardOverview historyDetails={historyDetails}/>
    </div>
  );
};

export default UserDashboardpage;