export default function ButtonDefault({
  color,
  text,
  action,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={action}
      className={`rounded-md px-4 py-2 shadow-md duration-200 border ${
        color == "base"
          ? "text-white border-theme-base bg-theme-base hover:bg-white hover:text-theme-base hover:shadow-theme-base/50 hover:border hover:border-theme-base"
          : color == "white"
          ? "text-theme-base border-theme-base bg-white hover:text-white hover:bg-theme-base hover:border-theme-base hover:shadow-lg hover:shadow-theme-base/50"
          : "text-neutral-900 bg-neutral-400 hover:bg-neutral-300"
      }`}
    >
      {text}
    </button>
  );
}
