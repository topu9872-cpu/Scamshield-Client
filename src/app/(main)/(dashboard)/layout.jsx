import Sidebar from "@/DashboardComponents/Sidebar/Sidebar";


const LayoutPage = ({children}) => {
  return (
    <div>
    <Sidebar/>
      {children}</div>
  );
};

export default LayoutPage;