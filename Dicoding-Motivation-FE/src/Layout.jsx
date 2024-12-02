import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  return (
    <div className="flex flex-col w-full h-screen font-base">
      <NavigationBar />
      <div className="w-full flex-1 flex items-stretch overflow-clip">
        <Sidebar />
        <div className="flex-1 max-h-fit overflow-y-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
