import React from "react";
import { RiTimerFlashLine } from "react-icons/ri";
import { Link } from "react-router";

export default function NoReminder({ show, toggleModal }) {
  return (
    <div
      className={`absolute m-auto items-center justify-center bg-black/25 w-full h-full z-10 font-quicksand ${
        show ? "flex" : "hidden"
      }`}
      onClick={toggleModal}
    >
      <div
        className="bg-neutral-300 p-8 rounded-lg shadow-md shadow-theme-base/50 text-left flex flex-col gap-4 items-center xl:w-[480px] lg:w-[420px] w-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        <RiTimerFlashLine className="w-36 h-36 " />
        <h3 className="text-neutral-900 font-semibold">
          Schedule Time To Learn
        </h3>
        <p className="text-neutral-900">
          Learning a little each day adds up. Research shows that students who
          make learning a habit are more likely to retain information and reach
          their goals. Set time aside to learn and get reminders using your
          learning event scheduler.
        </p>
        <div className="flex lg:flex-row lg:justify-end flex-col items-center gap-4 font-semibold w-full">
          <button
            onClick={toggleModal}
            className="bg-none rounded-md text-theme-base px-4 py-2 hover:bg-theme-base hover:text-white duration-200 outline-none"
          >
            Remind me later
          </button>
          <Link
            to={"/new-features/reminder-schedule/add"}
            className="bg-none rounded-md text-white bg-theme-base px-4 py-2 hover:bg-white hover:text-theme-base duration-200"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
