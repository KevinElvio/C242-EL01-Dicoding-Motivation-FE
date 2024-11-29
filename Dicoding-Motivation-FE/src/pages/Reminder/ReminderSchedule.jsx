import { useState } from "react";
import NoReminder from "../../components/Modal/NoReminder";
import TitleHeader from "../../components/TitleHeader";
import dataReminderSchedule from "../../data/reminder-schedule.json";
import { createDataReminderSchedule } from "../../functions/createRandomData";
import ReminderScheduleCard from "../../components/Card/ReminderCard";

export default function ReminderSchedule() {
  const [Show, setShow] = useState(true);
  const [dataReminder] = useState(dataReminderSchedule);

  const toggleModal = () => {
    setShow(!Show);
  };

  const data = createDataReminderSchedule({
    number_of_contents: 4,
    number_of_data: 6,
  });

  console.log(data);

  return (
    <div className="flex flex-col flex-1  max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder" />

      {/* No Reminder Modal */}
      <NoReminder show={Show} toggleModal={toggleModal} />
      <div className="grid grid-cols-12 gap-8 px-12 font-quicksand font-semibold my-8">
        {dataReminder.map((e, i) => (
          <ReminderScheduleCard
            reminder={e}
            key={i}
            index={e.id}
            className="lg:col-span-4 col-span-6"
          />
        ))}
      </div>
    </div>
  );
}