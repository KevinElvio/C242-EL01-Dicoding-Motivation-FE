import TitleHeader from "../components/TitleHeader";
// import PointsLeaderboard from "../data/person.json";
import { useEffect, useState } from "react";
import LeaderboardItem from "../components/ItemList/LeaderboardItem";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

export default function Leaderboard() {
  const [Filter, setFilter] = useState("daily");
  const [PointsLeaderboard, setPointsLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   console.log(PointsLeaderboard["daily"]);

  const changeFilter = (e) => {
    setFilter(e);
  };

  useEffect(() => {
    // axios.get(import.meta.env.VITE_API_URL + "leaderboards").then((res) => {
    //   // console.log(res.data);
    // });
    fetch(import.meta.env.VITE_API_URL + "leaderboards")
      .then((res) => {
        return res.json();
        // setPointsLeaderboard(res.data.data);
      })
      .then((res) => {
        console.log(res);
        setPointsLeaderboard(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log(PointsLeaderboard);

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Leaderboard" />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        {/* Filter */}
        <div className="flex gap-2 items-center justify-end">
          <p>Filter By</p>
          <button
            className={`rounded-lg  text-neutral-900 py-2 px-4 shadow-md ${
              Filter == "daily"
                ? "cursor-default bg-neutral-300 pointer-events-none"
                : " hover:bg-neutral-300 bg-neutral-400 active:shadow-lg duration-200"
            }`}
            onClick={() => changeFilter("daily")}
          >
            Daily
          </button>
          <button
            className={`rounded-lg text-neutral-900 py-2 px-4 shadow-md ${
              Filter == "weekly"
                ? "cursor-default bg-neutral-300 pointer-events-none"
                : " hover:bg-neutral-300 bg-neutral-400 active:shadow-lg duration-200"
            }`}
            onClick={() => changeFilter("weekly")}
          >
            Weekly
          </button>
          <button
            className={`rounded-lg  text-neutral-900 py-2 px-4 shadow-md ${
              Filter == "monthly"
                ? "cursor-default bg-neutral-300 pointer-events-none"
                : " hover:bg-neutral-300 bg-neutral-400 active:shadow-lg duration-200"
            }`}
            onClick={() => changeFilter("monthly")}
          >
            Monthly
          </button>
        </div>

        {/* Ranking Leaderboard */}
        <div className="flex flex-col gap-8">
          {PointsLeaderboard.map((person, index) => (
            <LeaderboardItem person={person} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
