import { LazyLoader } from "@/Ui/LazyLoder";

const UserManagementDashboard=LazyLoader(()=>import("@/DashboardComponents/Admin/UserManagementDashboard")) ;

const UsersPage = () => {
  return (
    <div>
      <UserManagementDashboard/>
    </div>
  );
};

export default UsersPage;