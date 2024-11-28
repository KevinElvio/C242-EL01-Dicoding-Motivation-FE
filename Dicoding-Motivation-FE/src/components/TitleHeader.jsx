import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

export default function TitleHeader({ title, back_button }) {
  const navigate = useNavigate();

  return (
    <div className="border-b-2 border-theme-base text-theme-base flex gap-4 items-center pl-12 py-8">
      {back_button ? (
        <IoMdArrowBack
          onClick={() => navigate(-1)}
          className="w-12 h-12 cursor-pointer active:text-theme-base/60 duration-200"
        />
      ) : (
        ""
      )}
      <h1 className="font-bold text-4xl ">{title}</h1>
    </div>
  );
}
