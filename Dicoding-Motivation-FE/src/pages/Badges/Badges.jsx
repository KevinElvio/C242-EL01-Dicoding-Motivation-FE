import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader";
import BadgeItem from "../../components/ItemList/BadgeItem";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function Badges() {
  const [UserPoint, setUserPoint] = useState(1500);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const claimAction = (point) => {
    const claim_action = toast.loading("Claiming badges...");
    fetch(import.meta.env.VITE_API_URL + `users/1/badges/1`, {
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        toast.update(claim_action, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setData(res.data);
      })
      .catch((err) => {
        toast.update(claim_action, {
          type: "error",
          isLoading: false,
          render: err.message,
          autoClose: 2000,
        });
      });
    setUserPoint(UserPoint + point);
  };

  useEffect(() => {
    // axios.get(import.meta.env.VITE_API_URL + "leaderboards").then((res) => {
    //   // console.log(res.data);
    // });
    fetch(import.meta.env.VITE_API_URL + "users/1/badges")
      .then((res) => {
        return res.json();
        // setPointsLeaderboard(res.data.data);
      })
      .then((res) => {
        // console.log(res);
        setData(res.data.filter((item) => item.claim === 0));
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

  return (
    <div className="flex flex-col w-full max-h-fit relative">
      <TitleHeader title="Badges" />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        {/* Redeem and Points count */}
        <div className="flex gap-2 items-center justify-between">
          <Link
            to={"/new-features/redeem-points"}
            className="rounded-md px-4 py-2 border-2 border-theme-base hover:bg-theme-base hover:text-white duration-200"
          >
            Reedem Point
          </Link>
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
