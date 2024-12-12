import { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader";
import { FaStar } from "react-icons/fa6";
import RedeemPointCard from "../../components/Card/RedeemPointCard";
// import RedeemPointList from "../../data/redeem-point.json";
import { toast } from "react-toastify";
import RedeemPointModal from "../../components/Modal/RedeemPointModal";

export default function RedeemPoint() {
  const [UserPoint, setUserPoint] = useState(1500);
  const [RedeemData, setRedeemData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRedeem, setSelectedRedeem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const claimPointAction = (point, item_id) => {
    // const updatedRedeemData = RedeemData.filter((_, i) => i !== index);
    const claim_point_toast = toast.loading("redeem point...");
    fetch(import.meta.env.VITE_API_URL + `users/1/redeems/${item_id}`, {
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        toast.update(claim_point_toast, {
          type: "success",
          isLoading: false,
          render: res.message,
          autoClose: 2000,
        });
        setRedeemData(res.data.filter((item) => item.claim === 0));
      })
      .catch((err) => {
        toast.update(claim_point_toast, {
          type: "error",
          isLoading: false,
          render: err.message,
          autoClose: 2000,
        });
      });
    setUserPoint(UserPoint - point);
  };

  const openModal = (redeem, index) => {
    setSelectedRedeem({ ...redeem, index });
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRedeem(null);
    setShowModal(false);
  };

  const confirmRedeem = () => {
    if (selectedRedeem) {
      claimPointAction(selectedRedeem.points, selectedRedeem.index);
    }
    closeModal();
  };

  useEffect(() => {
    // axios.get(import.meta.env.VITE_API_URL + "leaderboards").then((res) => {
    //   // console.log(res.data);
    // });
    fetch(import.meta.env.VITE_API_URL + "users/1/redeems")
      .then((res) => {
        return res.json();
        // setPointsLeaderboard(res.data.data);
      })
      .then((res) => {
        // console.log(res);
        setRedeemData(res.data.filter((item) => item.claim === 0));
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
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Redeem Points" back_button={true} />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        {/* Modal */}
        <RedeemPointModal
          confirmRedeem={confirmRedeem}
          selectedRedeem={selectedRedeem}
          closeModal={closeModal}
          show={showModal}
        />

        {/* User Points */}
        <div className="flex gap-2 items-center justify-end">
          <div className="flex gap-4 items-center">
            <p className="text-2xl text-neutral-900">Current Points</p>
            <div className="rounded-lg flex items-center gap-2 p-2 bg-neutral-400 shadow-md">
              <FaStar className="w-8 h-8 " />
              <p className="text-neutral-900 text-xl">{UserPoint}</p>
            </div>
          </div>
        </div>

        {/* Redeem Point List */}
        <div className="grid 2xl:grid-cols-10 grid-cols-12 w-full gap-4 ">
          {RedeemData.map((redeem_point, index) => (
            <RedeemPointCard
              key={index}
              user_point={UserPoint}
              redeem_point={redeem_point}
              className="2xl:col-span-2 xl:col-span-3 lg:col-span-4 col-span-6"
              redeemAction={openModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
