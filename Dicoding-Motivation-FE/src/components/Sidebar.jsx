import { useResolvedPath } from "react-router";
import { MdAssignment, MdLeaderboard } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
import { LuGauge } from "react-icons/lu";
import { FaFireAlt } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import SidebarLinkButton from "./Button/SidebarLinkButton";

export default function Sidebar() {
  const path = useResolvedPath();
  const active_path = path.pathname.split("/").pop();
  //   console.log(active_path);

  return (
    <div className="py-4 self-stretch flex flex-col gap-2 text-theme-shadow font-medium 2xl:min-w-80 xl:min-w-72 lg:min-w-64 min-w-60 bg-theme-sidebar">
      {/* Leaderboard  */}
      <SidebarLinkButton
        text="Leaderboard"
        icon={<MdLeaderboard className="w-8 h-8 text-theme-base" />}
        is_active={active_path == "new-features" || active_path == ""}
        target_url={"/new-features"}
      />

      {/* Skill Radar */}
      <SidebarLinkButton
        text="Skill Radar"
        icon={<LuGauge className="w-8 h-8 text-theme-base" />}
        is_active={active_path == "skill-radar"}
        target_url={"/new-features/skill-radar"}
      />

      {/* Survey */}
      <SidebarLinkButton
        text="Survey"
        icon={<MdAssignment className="w-8 h-8 text-theme-base" />}
        is_active={active_path == "survey"}
        target_url={"/new-features/survey"}
      />

      {/* Reminder Schedule */}
      <SidebarLinkButton
        text="Reminder Schedule"
        icon={<RiCalendarScheduleFill className="w-8 h-8 text-theme-base" />}
        is_active={active_path == "reminder-schedule"}
        target_url={"/new-features/reminder-schedule"}
      />

      {/* Badges */}
      <SidebarLinkButton
        text="Badges"
        icon={<HiBadgeCheck className="w-8 h-8 text-theme-base" />}
        is_active={active_path == "badges" || active_path == "redeem-points"}
        target_url={"/new-features/badges"}
      />

      {/* Streak */}
      <SidebarLinkButton
        text="Streak"
        icon={<FaFireAlt className="w-8 h-8 text-theme-base" />}
        is_active={active_path == "streak"}
        target_url={"/new-features/streak"}
      />
    </div>
  );
}
