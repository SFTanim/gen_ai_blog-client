import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navber from "./shared/Navber";

const Root = () => {
  const { darkTheme } = useAuth();
  return (
    <div
      className="font-mont overflow-hidden bg-color font-color"
      data-theme={darkTheme ? "dark" : "light"}
    >
      <div className="fixed z-40 w-full">
        <Navber></Navber>
      </div>
      <div className=" min-h-screen px-2 lg:px-0 mt-20 lg:mt-24">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
