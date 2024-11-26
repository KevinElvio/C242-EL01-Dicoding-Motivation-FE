import { BsFillMortarboardFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

export default function BadgeItem({ badge, claim_action, user_point, index }) {
  return (
    <div className="rounded-lg py-2 px-4 bg-white shadow-md shadow-theme-base/50 flex gap-4">
      <BsFillMortarboardFill className="w-24 h-24 text-theme-base" />
      <div className="flex flex-col h-full justify-around flex-1 gap-2">
        <p className="text-2xl text-theme-base">{badge.name}</p>
        <p className="text-lg text-theme-base font-base font-normal text-pretty">
          {badge.description}
        </p>
        <p className="text-theme-base text-2xl">
          {badge.claimed ? "Unlocked" : "Locked"}
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-self-end items-end">
        <div className="flex items-center text-lg text-neutral-900 gap-2">
          <FaStar className="w-8 h-8" />
          <p>{badge.point_needed} Points</p>
        </div>
        <button
          className="border border-theme-base text-theme-base rounded-lg px-4 py-2"
          onClick={() => claim_action(badge.point_needed, index)}
          disabled={user_point < badge.point_needed}
        >
          {badge.claimed ? "Claimed" : "Claim"}
        </button>
      </div>
    </div>
  );
}
