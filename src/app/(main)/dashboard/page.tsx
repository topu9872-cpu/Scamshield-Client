import { LazyLoader } from "@/Ui/LazyLoder";

const UserDashboardOverview =LazyLoader(()=>import("@/DashboardComponents/user/UserDashboardOverview")) ;

const UserDashboardpage = () => {
  return (
    <div>
        <UserDashboardOverview/>
    </div>
  );
};

export default UserDashboardpage;