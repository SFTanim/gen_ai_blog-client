import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navber from "./shared/Navber";

const Root = () => {
  const { darkTheme } = useAuth();
  return (
    <div className="font-mont" data-theme={darkTheme ? "dark" : "light"}>
      <Navber></Navber>
      <div className="container mx-auto min-h-screen px-2 lg:px-0 mt-8 lg:mt-14">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
