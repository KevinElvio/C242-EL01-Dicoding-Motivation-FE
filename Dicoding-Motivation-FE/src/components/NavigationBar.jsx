import { Link } from "react-router";

export default function NavigationBar() {
  return (
    <nav className="flex w-full gap-8 lg:px-8 px-4 font-quicksand font-semibold items-center text-lg text-theme-base border-b-2 border-theme-base">
      <img
        src="/Main_Logo Dicoding.png"
        alt="Logo Dicoding"
        width={196}
        className="my-4 mx-8"
      />
      <a
        href={"https://www.dicoding.com/"}
        className="px-4 py-2 hover:bg-theme-secondary duration-200"
      >
        Home
      </a>
      <a
        href={"https://www.dicoding.com/"}
        className="px-4 py-2 hover:bg-theme-secondary duration-200"
      >
        Academy
      </a>
      <a
        href={"https://www.dicoding.com/"}
        className="px-4 py-2 hover:bg-theme-secondary duration-200"
      >
        Challenge
      </a>
      <a
        href={"https://www.dicoding.com/"}
        className="px-4 py-2 hover:bg-theme-secondary duration-200"
      >
        Event
      </a>
      <a
        href={"https://www.dicoding.com/"}
        className="px-4 py-2 hover:bg-theme-secondary duration-200"
      >
        Job
      </a>
      <Link
        to={"/new-features"}
        className="px-4 py-2 hover:bg-theme-secondary duration-200"
      >
        New Features
      </Link>
    </nav>
  );
}
