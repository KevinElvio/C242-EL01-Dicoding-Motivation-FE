import { Link } from "react-router";

export default function SidebarLinkButton({
  is_active,
  text,
  icon,
  target_url,
}) {
  return (
    <Link
      to={target_url}
      className={`flex items-center px-8 py-2 gap-2 ${
        is_active
          ? "bg-theme-secondary text-neutral-900 cursor-pointer pointer-events-none"
          : "hover:bg-theme-secondary hover:text-neutral-900 duration-200"
      }`}
    >
      {icon}
      {text}
    </Link>
  );
}
