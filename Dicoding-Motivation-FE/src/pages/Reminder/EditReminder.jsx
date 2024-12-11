import { useParams } from "react-router";
import TitleHeader from "../../components/TitleHeader";
import InputText from "../../components/Input/InputText";
// import DataRemainder from "../../data/reminder-schedule.json";
import ButtonDefault from "../../components/Button/ButtonDefault";
import { useForm } from "react-hook-form";
import InputButtonSelect from "../../components/Input/InputButtonSelect";
import InputTimePicker from "../../components/Input/InputTimePicker";
import InputButtonSelectDays from "../../components/Input/InputButtonSelectDays";
import moment from "moment";
import InputDateTimePicker from "../../components/Input/InputDateTimePicker";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditReminder() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [data, setData] = useState()

  const { control, setValue, watch, handleSubmit, reset } = useForm({
    // defaultValues: {
    //   name: DetailReminder.name,
    //   days: DetailReminder.time.days || [0, 0, 0, 0, 0, 0, 0], // Initialize no reminders
    //   date: DetailReminder.time.time,
    //   frequency: DetailReminder.frequency,
    // },
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `users/7/reminders/${id}`)
      .then((res) => {
        console.log(res);

        return res.json();
      })
      .then((res) => {
        const reminder = res.data[0];

        // Combine time string with a reference date
        const parsedTime = reminder.time
          ? moment(reminder.time, "HH:mm").toDate() // Use "HH:mm" format to parse
          : null;

        reset({
          name: reminder.name,
          frequency: reminder.frequency,
          time: parsedTime, // Use the parsed time
          date: reminder.date ?? moment().format("yyyy-MM-DD"),
          days: reminder.days,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setError(error);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = (data) => {
    const submiting_toast = toast.loading("submiting reminder...");
    if (!watch("frequency")) {
      toast.error("Please fill all required field!", { autoClose: 2000 });
      return;
    }
    if (watch("frequency") == "weekly" && watch("days").length < 1) {
      toast.error("Please fill all required field!", { autoClose: 2000 });
      return;
    }
    fetch(import.meta.env.VITE_API_URL + `users/7/reminders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        frequency: data.frequency,
        time: moment(data.time).format("HH:mm"),
        date: data.date
          ? moment(data.date).format("yyyy-MM-DD")
          : moment().format("yyyy-MM-DD"),
        days: data.days ?? null,
        course_ids: [2],
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (response.authUrl) {
          window.open(response.authUrl, "_blank", "noopener,noreferrer");
          return;
        }
        if (res.status == 200) {
          toast.update(submiting_toast, {
            render: response.message,
            isLoading: false,
            type: "success",
            autoClose: 2000,
          });
          return;
        }
        toast.update(submiting_toast, {
          render: response.message,
          isLoading: false,
          type: "error",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.update(submiting_toast, {
          render: err.message,
          isLoading: false,
          type: "error",
          autoClose: 2000,
        });
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex flex-col flex-1 max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8"
      >
        <InputText
          label="Event Name"
          name="name"
          value={watch("name")}
          setValue={setValue}
          inputClassName="max-w-80"
        />

        {/* Input Frequency */}
        <InputButtonSelect
          name="frequency"
          label="Select a Category"
          options={[
            { value: "Daily", label: "Daily" },
            { value: "Weekly", label: "Weekly" },
            { value: "Once", label: "Once" },
          ]}
          currentValue={watch("frequency")}
          buttonClassName="hover:bg-blue-100"
          selectedClassName="border-blue-500"
          setValue={setValue}
        />

        {/* Input Time */}
        {watch("frequency") === "Daily" ? (
          <InputTimePicker
            currentValue={watch("time")}
            label="Time"
            name={"time"}
            className="w-80"
            setValue={setValue}
          />
        ) : watch("frequency") === "Weekly" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
            <InputTimePicker
              currentValue={moment(watch("time")).format("H:mm A")}
              label="Time"
              name="time"
              className="w-80"
              setValue={setValue}
            />
            <InputButtonSelectDays
              label="Days"
              name="days"
              control={control}
              buttonClassName="hover:bg-blue-100"
              defaultValueControl={watch("days")}
            />
          </div>
        ) : watch("frequency") === "Once" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
            <InputTimePicker
              currentValue={moment(watch("time")).format("H:mm A")}
              label="Time"
              name="time"
              className="flex-1 max-w-80"
            />
            <InputDateTimePicker
              currentValue={watch("date")}
              setValue={setValue}
              label="Date"
              name="date"
            />
          </div>
        ) : null}

        <div className="flex gap-4 justify-end self-end">
          <ButtonDefault
            color="white"
            text="Discard"
            type="reset"
            action={() => reset()}
          />
          <ButtonDefault color="base" text="Save" type="submit" />
        </div>
      </form>
    </div>
  );
}
