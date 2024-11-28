import { useState } from "react";
import TitleHeader from "../../components/TitleHeader";
import { FaStar } from "react-icons/fa6";
import RedeemPointCard from "../../components/Card/RedeemPointCard";
import RedeemPointList from "../../data/redeem-point.json";
import { toast } from "react-toastify";
import RedeemPointModal from "../../components/Modal/RedeemPointModal";

export default function RedeemPoint() {
  const [UserPoint, setUserPoint] = useState(800);
  const [RedeemData, setRedeemData] = useState(RedeemPointList);
  const [showModal, setShowModal] = useState(false);
  const [selectedRedeem, setSelectedRedeem] = useState(null);

  const claimPointAction = (point, index) => {
    const updatedRedeemData = RedeemData.filter((_, i) => i !== index);
    setRedeemData(updatedRedeemData);
    setUserPoint(UserPoint + point);
    toast.success("Redeem points success!", {
      autoClose: 2000,
    });
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
              redeem_point={redeem_point}
              index={index}
              className="2xl:col-span-2 xl:col-span-3 lg:col-span-4 col-span-6"
              redeemAction={openModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
