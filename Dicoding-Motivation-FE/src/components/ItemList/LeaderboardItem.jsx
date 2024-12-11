import { BsFillMortarboardFill, BsPersonCircle } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

export default function LeaderboardItem({ person, index, className }) {
  return (
    <div
      className={`rounded-lg py-2 px-4 bg-white shadow-md shadow-theme-base/50 flex gap-4 ${className}`}
    >
      <BsPersonCircle className="w-24 h-24 text-theme-base" />
      <div className="flex flex-col h-full justify-around">
        <p className="text-2xl text-theme-base">{person.username}</p>
        <div className="flex items-center text-lg text-neutral-900 gap-2">
          <FaStar className="w-8 h-8 " />
          <p>{person.points}</p>
        </div>
      </div>
      {index == 0 ? (
        <BsFillMortarboardFill className="w-12 h-12 text-theme-base justify-self-end" />
      ) : (
        ""
      )}
    </div>
  );
}
