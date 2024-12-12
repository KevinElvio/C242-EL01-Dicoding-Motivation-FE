import { useNavigate, useParams } from "react-router";
import TitleHeader from "../../components/TitleHeader";
import InputText from "../../components/Input/InputText";
import ButtonDefault from "../../components/Button/ButtonDefault";
import { useForm } from "react-hook-form";
import InputButtonSelect from "../../components/Input/InputButtonSelect";
import InputTimePicker from "../../components/Input/InputTimePicker";
import InputButtonSelectDays from "../../components/Input/InputButtonSelectDays";
import moment from "moment";
import InputDateTimePicker from "../../components/Input/InputDateTimePicker";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DetailReminder() {
  // hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    frequency: "",
    date: "",
    time: "",
    days: "",
  });
  // const detail = useFetch;
  // const { control } = useForm();

  // state

  const { control } = useForm({
    defaultValues: {
      name: data.name,
      frequency: data.frequency,
      date: data.date,
      time: data.time,
      days: data.days,
    },
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `users/7/reminders/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const reminder = res.data[0];
        console.log(reminder);

        // Combine time string with a reference date
        const parsedTime = reminder.time
          ? moment(reminder.time, "HH:mm").toDate() // Use "HH:mm" format to parse
          : null;

        setData({
          name: reminder.name,
          frequency: reminder.frequency,
          time: parsedTime,
          date: reminder.date ?? moment().format("yyyy-MM-DD"),
          days: reminder.days ?? [],
        });

        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);

        setError(error);
        setLoading(false);
      });
  }, [id]);

  const onDelete = () => {
    const delete_toast = toast.loading("submiting reminder...");
    fetch(import.meta.env.VITE_API_URL + `users/7/reminders/${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const response = await res.json();
        if (res.status == 200) {
          toast.update(delete_toast, {
            render: response.message,
            isLoading: false,
            type: "success",
            autoClose: 2000,
          });
          navigate("/new-features/reminder-schedule");
          return;
        }
        toast.update(delete_toast, {
          render: response.message,
          isLoading: false,
          type: "error",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.update(delete_toast, {
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
    <div className="flex flex-col flex-1  max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder" />
      <div className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8">
        <InputText
          label="Event Name"
          name={"name"}
          value={data.name}
          inputClassName="max-w-80"
          readOnly
        />

        <InputButtonSelect
          name="category"
          label="Select a Category"
          control={control}
          options={[
            { value: "Daily", label: "Daily" },
            { value: "Weekly", label: "Weekly" },
            { value: "Once", label: "once" },
          ]}
          currentValue={data.frequency}
          readOnly={true}
          buttonClassName="hover:bg-blue-100"
          selectedClassName="border-blue-500"
          rea
        />

        {data.frequency == "Daily" ? (
          <InputTimePicker
            readOnly={true}
            currentValue={data.time}
            label="Time"
            name={"time"}
          />
        ) : data.frequency == "Weekly" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
            <InputTimePicker
              readOnly={true}
              currentValue={data.time}
              label="Time"
              name={"time"}
              className="flex-1 max-w-80"
            />
            <InputButtonSelectDays
              label="Days"
              name="days"
              control={control}
              defaultValueControl={data.days}
              // className=""
              buttonClassName="hover:bg-blue-100"
              // selectedClassName="border-blue-500"
            />
          </div>
        ) : data.frequency == "Once" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
            <InputTimePicker
              readOnly={true}
              currentValue={data.time}
              label="Time"
              name={"time"}
              className="flex-1 max-w-80"
            />
            <InputDateTimePicker
              readOnly={true}
              currentValue={moment(data.date).format("yyyy-MM-DD")}
              // setValue={setValue}
              label="Date"
              name={"date"}
              // className="flex-1 max-w-80"
            />
          </div>
        ) : (
          ""
        )}

        <div className="flex gap-4 justify-end self-end">
          <ButtonDefault
            color={"white"}
            text={"Delete"}
            action={() => onDelete()}
          />
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
