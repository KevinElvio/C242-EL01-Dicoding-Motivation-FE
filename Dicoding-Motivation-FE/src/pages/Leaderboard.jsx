import TitleHeader from "../components/TitleHeader";
import PointsLeaderboard from "../data/person.json";
import { useState } from "react";
import LeaderboardItem from "../components/ItemList/LeaderboardItem";

export default function Leaderboard() {
  const [Filter, setFilter] = useState("daily");
  //   console.log(PointsLeaderboard["daily"]);

  const changeFilter = (e) => {
    setFilter(e);
  };

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Leaderboard" />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        {/* Filter */}
        <div className="flex gap-2 items-center justify-end">
          <p>Filter By</p>
          <button
            className={`rounded-lg bg-neutral-400 text-neutral-900 py-2 px-4 shadow-md ${
              Filter == "daily"
                ? "cursor-default bg-neutral-300 pointer-events-none"
                : " hover:bg-neutral-300 active:shadow-lg duration-200"
            }`}
            onClick={() => changeFilter("daily")}
          >
            Daily
          </button>
          <button
            className={`rounded-lg bg-neutral-400 text-neutral-900 py-2 px-4 shadow-md ${
              Filter == "weekly"
                ? "cursor-default bg-neutral-300 pointer-events-none"
                : " hover:bg-neutral-300 active:shadow-lg duration-200"
            }`}
            onClick={() => changeFilter("weekly")}
          >
            Weekly
          </button>
          <button
            className={`rounded-lg bg-neutral-400 text-neutral-900 py-2 px-4 shadow-md ${
              Filter == "monthly"
                ? "cursor-default bg-neutral-300 pointer-events-none"
                : " hover:bg-neutral-300 active:shadow-lg duration-200"
            }`}
            onClick={() => changeFilter("monthly")}
          >
            Monthly
          </button>
        </div>

        {/* Ranking Leaderboard */}
        <div className="flex flex-col gap-8">
          {PointsLeaderboard[Filter].map((person, index) => (
            <LeaderboardItem person={person} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
