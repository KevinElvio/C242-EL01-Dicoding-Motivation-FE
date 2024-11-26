import { FaStar } from "react-icons/fa6";
import TitleHeader from "../components/TitleHeader";
import BadgeList from "../data/badge.json";
import { useState } from "react";
import BadgeItem from "../components/ItemList/BadgeItem";

export default function Badges() {
  const [UserPoint, setUserPoint] = useState(800);
  const [Data, setData] = useState(BadgeList);

  const claimAction = (point, index) => {
    setUserPoint(UserPoint - point);
    // const new_data = Data.splice(index, index)
    setData((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, claimed: true } : item
      )
    );

    console.log(Data);
  };

  //   const claimAction = (index) => {
  //     setItems((prevItems) =>
  //       prevItems.map((item, idx) =>
  //         idx === index ? { ...item, claimed: true } : item
  //       )
  //     );
  //   };

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Badges" />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        {/* Redeem and Points count */}
        <div className="flex gap-2 items-center justify-between">
          <button className="rounded-md px-4 py-2 border-2 border-theme-base hover:bg-theme-base hover:text-white duration-200">
            Reedem Point
          </button>
          <div className="flex gap-4 items-center">
            <p className="text-2xl text-neutral-900">Current Points</p>
            <div className="rounded-lg flex items-center gap-2 p-2 bg-neutral-400 shadow-md">
              <FaStar className="w-8 h-8 " />
              <p className="text-neutral-900 text-xl">{UserPoint}</p>
            </div>
          </div>
        </div>

        {/* Daftar Badge */}
        <div className="flex flex-col gap-4">
          {Data.map((badge, index) => (
            <BadgeItem
              badge={badge}
              user_point={UserPoint}
              claim_action={claimAction}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
