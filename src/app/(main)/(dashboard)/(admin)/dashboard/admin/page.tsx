import { LazyLoader } from "@/Ui/LazyLoder";

const CompleteAdminDashboard =LazyLoader(()=>import("@/DashboardComponents/Admin/SingleFileDashboard")) ;


const AdminDashboardPage = () => {
  return (
    <div>
<CompleteAdminDashboard/>
    </div>
  );
};

export default AdminDashboardPage;