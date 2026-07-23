import { LazyLoader } from "@/Ui/LazyLoder";

const UserProfilePage =LazyLoader(()=>import("@/DashboardComponents/user/ProfilePage")) ;

const ProfilePage = () => {
  return (
    <div>
        <UserProfilePage/>
    </div>
  );
};

export default ProfilePage;