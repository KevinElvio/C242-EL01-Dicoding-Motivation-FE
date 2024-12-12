import { FaStar } from "react-icons/fa6";
import { HiOutlineCube } from "react-icons/hi";

export default function RedeemPointCard({
  redeem_point,
  user_point,
  redeemAction,
  className,
}) {
  return (
    <div
      onClick={() => redeemAction(redeem_point, redeem_point.item_id)}
      className={`p-4 flex flex-col gap-2  rounded-lg shadow-md text-center justify-between items-center font-quicksand hover:shadow-lg shadow-neutral-900/50 hover:shadow-theme-base/50 cursor-pointer active:shadow-teal-600/50 duration-200 ${
        user_point < redeem_point.points
          ? "pointer-events-none bg-neutral-200"
          : "bg-white"
      } ${className}`}
    >
      <HiOutlineCube
        className={`w-36 h-36 ${
          user_point < redeem_point.points
            ? "text-neutral-600"
            : " text-neutral-900"
        }`}
      />
      <p className="font-semibold text-theme-base">{redeem_point.name}</p>
      <p className="text-neutral-600">{redeem_point.description}</p>
      <div
        className={`flex gap-2 items-center ${
          user_point < redeem_point.points
            ? "text-neutral-600"
            : " text-neutral-900"
        }`}
      >
        <FaStar className="w-8 h-8" />
        <p>{redeem_point.points}</p>
      </div>
    </div>
  );
}
