import { FaQuestionCircle } from "react-icons/fa";

export default function RedeemPointModal({
  selectedRedeem,
  closeModal,
  show,
  confirmRedeem,
}) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 items-center justify-center z-10 font-quicksand ${
        show ? "flex" : "hidden"
      }`}
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col gap-4 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <FaQuestionCircle className="rounded-full text-neutral-600 w-32 h-32" />
        <h3 className="text-lg font-semibold mb-4">
          Confirm Redeem: {selectedRedeem?.name}?
        </h3>
        <p className="mb-4">
          This will add <strong>{selectedRedeem?.points}</strong> points to your
          account.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={confirmRedeem}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
