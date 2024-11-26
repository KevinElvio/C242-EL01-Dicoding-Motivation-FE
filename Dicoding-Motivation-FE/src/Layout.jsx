import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  // console.log(active_path);
  return (
    <div className="flex flex-col w-full min-h-screen font-base ">
      <NavigationBar />
      <div className="w-full h-full flex-1 flex items-stretch">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
