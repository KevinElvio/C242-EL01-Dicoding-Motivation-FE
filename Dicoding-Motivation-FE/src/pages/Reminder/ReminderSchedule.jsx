import { useEffect, useState } from "react";
import NoReminder from "../../components/Modal/NoReminder";
import TitleHeader from "../../components/TitleHeader";
// import dataReminderSchedule from "../../data/reminder-schedule.json";
import { createDataReminderSchedule } from "../../functions/createRandomData";
import ReminderScheduleCard from "../../components/Card/ReminderCard";
import ButtonDefault from "../../components/Button/ButtonDefault";
import { useNavigate } from "react-router";

export default function ReminderSchedule() {
  // hooks
  const navigate = useNavigate();

  const [Show, setShow] = useState(true);
  const [dataReminder, setDataReminder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleModal = () => {
    setShow(!Show);
  };

  const data = createDataReminderSchedule({
    number_of_contents: 4,
    number_of_data: 6,
  });

  console.log(data);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "users/7/reminders")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDataReminder(res.data);
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
    <div className="flex flex-col max-h-fit relative">
      <TitleHeader title="Reminder" />

      {/* No Reminder Modal */}
      <NoReminder show={Show} toggleModal={toggleModal} />

      <div className="grid grid-cols-12 gap-8 px-12 font-quicksand font-semibold my-8">
        {dataReminder.map((e, i) => (
          <ReminderScheduleCard
            reminder={e}
            key={i}
            className="lg:col-span-4 col-span-6"
          />
        ))}
      </div>
      <div className="flex justify-end mx-12 py-8">
        <ButtonDefault
          text={"Add"}
          color={"base"}
          type="button"
          action={() => navigate("/new-features/reminder-schedule/add")}
        />
      </div>
    </div>
  );
}
