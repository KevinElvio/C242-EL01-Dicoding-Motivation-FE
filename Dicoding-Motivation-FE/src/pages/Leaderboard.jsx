import TitleHeader from "../components/TitleHeader";
// import PointsLeaderboard from "../../public/dummy/person.json";
// import { useState } from "react";

export default function Leaderboard() {
  //   const [Filter, setFilter] = useState("daily");
  //   console.log(PointsLeaderboard["daily"]);

  return (
    <div className="flex flex-col w-full">
      <TitleHeader title="Leaderboard" />
      {/* {
            PointsLeaderboard[Filter].map((person, index) => 
                <div key={index}></div>
            )
        } */}
    </div>
  );
}
