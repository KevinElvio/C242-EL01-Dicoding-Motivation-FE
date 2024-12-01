import { useNavigate, useParams } from "react-router";
import TitleHeader from "../../components/TitleHeader";
import InputText from "../../components/Input/InputText";
import DataRemainder from "../../data/reminder-schedule.json";
import ButtonDefault from "../../components/Button/ButtonDefault";
import InputCheckbox from "../../components/Input/InputCheckBox";
import { useForm } from "react-hook-form";
import InputButtonSelect from "../../components/Input/InputButtonSelect";
import InputTimePicker from "../../components/Input/InputTimePicker";
import InputButtonSelectDays from "../../components/Input/InputButtonSelectDays";
import moment from "moment";
import InputDateTimePicker from "../../components/Input/InputDateTimePicker";

export default function DetailReminder() {
  // hooks
  const { id } = useParams();
  const navigate = useNavigate();
  // const { control } = useForm();

  // state
  const DetailReminder = DataRemainder[id - 1];

  const { control, setValue, watch } = useForm({
    defaultValues: {
      days: DetailReminder.time.days
        ? DetailReminder.time.days
        : [0, 0, 0, 0, 0, 0, 0], // Initialize no reminders
      date: DetailReminder.time.time,
    },
  });
  return (
    <div className="flex flex-col flex-1  max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder" />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        <InputText
          label="Event Name"
          name={"event_name"}
          value={DetailReminder.name}
          inputClassName="max-w-80"
          readOnly
        />
        <div className="flex flex-col ">
          <p className="font-bold text-theme-base text-lg mb-2">
            Attach Content
          </p>
          {DetailReminder.contents.map((item, index) => (
            <InputCheckbox
              key={index}
              name={item.title}
              label={item.title}
              value={item.id}
              checked={item.selected}
              readOnly
            />
          ))}
        </div>
        <InputButtonSelect
          name="category"
          label="Select a Category"
          control={control}
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "once", label: "once" },
          ]}
          currentValue={DetailReminder.frequency}
          readOnly={true}
          buttonClassName="hover:bg-blue-100"
          selectedClassName="border-blue-500"
          rea
        />

        {DetailReminder.frequency == "daily" ? (
          <InputTimePicker
            readOnly={true}
            currentValue={DetailReminder.time.time}
            label="Time"
            name={"time"}
          />
        ) : DetailReminder.frequency == "weekly" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
            <InputTimePicker
              readOnly={true}
              currentValue={DetailReminder.time.time}
              label="Time"
              name={"time"}
              className="flex-1 max-w-80"
            />
            <InputButtonSelectDays
              label="Days"
              name="days"
              control={control}
              // className=""
              buttonClassName="hover:bg-blue-100"
              // selectedClassName="border-blue-500"
            />
          </div>
        ) : DetailReminder.frequency == "once" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
            <InputTimePicker
              readOnly={true}
              currentValue={moment(DetailReminder.time.time).format("H:mm A")}
              label="Time"
              name={"time"}
              className="flex-1 max-w-80"
            />
            <InputDateTimePicker
              readOnly={true}
              currentValue={watch("date")}
              setValue={setValue}
              label="Date"
              name={"date"}
              // className="flex-1 max-w-80"
            />
          </div>
        ) : (
          ""
        )}

        <div className="flex gap-4 justify-end self-end">
          <ButtonDefault color={"white"} text={"Delete"} />
          <ButtonDefault
            color={"base"}
            text="Edit"
            action={() =>
              navigate(`/new-features/reminder-schedule/edit/${id}`)
            }
          />
        </div>
      </div>
    </div>
  );
}
