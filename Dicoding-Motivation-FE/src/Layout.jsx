import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  // console.log(active_path);
  return (
    <div className="flex flex-col w-full h-screen font-base max-h-screen">
      <NavigationBar />
      <div className="w-full h-fit flex-1 flex items-stretch overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
