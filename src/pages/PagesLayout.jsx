import { Outlet } from "react-router-dom";
import MainNavigation from "../components/UI/MainNavigation";

const PagesLayout = () => {
  return (
    <div>
      <MainNavigation />
      <Outlet />
    </div>
  );
};

export default PagesLayout;
