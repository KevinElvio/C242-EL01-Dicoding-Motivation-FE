import moment from "moment";
import { useNavigate } from "react-router";

export default function ReminderCard({ reminder, className }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(
          `/new-features/reminder-schedule/detail/${reminder.reminder_id}`
        )
      }
      className={`p-6 flex flex-col gap-4 bg-white border-2 min-h-60 text-theme-base border-theme-base rounded-lg shadow-md text-center justify-between items-center font-quicksand hover:shadow-lg shadow-neutral-900/50 hover:shadow-theme-base/50 cursor-pointer active:shadow-teal-600/50 duration-200 ${className}`}
    >
      <p className="font-semibold text-neutral-900 text-xl">{reminder.name}</p>
      <div className="flex text-lg gap-4 text-theme-base flex-1 items-center justify-stretch w-full">
        <div className="font-semibold rounded-lg border border-theme-base px-4 py-2 flex-1">
          {reminder.frequency == "once"
            ? moment(reminder.time).format("yyyy-MM-DD hh:mm")
            : reminder.time}
        </div>
        <div className="font-semibold rounded-lg border border-theme-base px-4 py-2 flex-1">
          {reminder.frequency}
        </div>
      </div>
    </div>
  );
}
