import { useState } from "react";
import NoReminder from "../components/Modal/NoReminder";
import TitleHeader from "../components/TitleHeader";

export default function ReminderSchedule() {
  const [Show, setShow] = useState(true);

  const toggleModal = () => {
    setShow(!Show);
  };
  return (
    <div className="flex flex-col flex-1  max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder Schedule" />

      {/* No Reminder Modal */}
      <NoReminder show={Show} toggleModal={toggleModal} />
      <div className="flex flex-col h-full"></div>
    </div>
  );
}
