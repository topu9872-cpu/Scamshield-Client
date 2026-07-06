import NavbarPage from "@/Components/Navbar/Navbar";

const LayoutPage = ({children}) => {
  return (
    <div>
      <NavbarPage/>
      {children}</div>
  );
};

export default LayoutPage;