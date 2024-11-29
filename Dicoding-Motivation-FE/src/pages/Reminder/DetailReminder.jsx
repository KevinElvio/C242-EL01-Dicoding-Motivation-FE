// import { useParams } from "react-router";
import TitleHeader from "../../components/TitleHeader";

export default function DetailReminder() {
  // const { id } = useParams();

  return (
    <div className="flex flex-col flex-1  max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder" />
    </div>
  );
}
