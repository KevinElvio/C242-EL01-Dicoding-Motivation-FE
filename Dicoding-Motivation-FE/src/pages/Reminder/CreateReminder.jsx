import TitleHeader from "../../components/TitleHeader";
import InputText from "../../components/Input/InputText";
import ButtonDefault from "../../components/Button/ButtonDefault";
import { useForm } from "react-hook-form";
import InputButtonSelect from "../../components/Input/InputButtonSelect";
import InputTimePicker from "../../components/Input/InputTimePicker";
import InputButtonSelectDays from "../../components/Input/InputButtonSelectDays";
import moment from "moment";
import InputDateTimePicker from "../../components/Input/InputDateTimePicker";
import { toast } from "react-toastify";
// import { redirect } from "react-router";

export default function CreateReminder() {
  // hooks
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const { control } = useForm();

  const { control, setValue, watch, handleSubmit, reset } = useForm({});

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
    fetch(import.meta.env.VITE_API_URL + "users/7/reminders", {
      method: "POST",
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
        if (res.status == 200) {
          const response = await res.json();
          window.open(response.authUrl, "_blank", "noopener,noreferrer");
        }
        if (res.status == 201) {
          const response = await res.json();
          toast.update(submiting_toast, {
            render: response.message,
            isLoading: false,
            type: "success",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        toast.update(submiting_toast, {
          render: err.message,
          isLoading: false,
          type: "error",
          autoClose: 2000,
        });
      });
    // console.log({
    //   name: data.name,
    //   frequency: data.frequency,
    //   time: moment(data.time).format("HH:mm"),
    //   date: data.date
    //     ? moment(data.date).format("yyyy-MM-DD")
    //     : moment().format("yyyy-MM-DD"),
    //   days: data.days ?? null,
    //   course_ids: [2],
    // });
  };
  return (
    <div className="flex flex-col flex-1  max-h-fit overflow-y-scroll relative">
      <TitleHeader title="Reminder" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-12 font-quicksand font-semibold my-8"
      >
        <InputText
          label="Event Name"
          name={"name"}
          value={watch("name")}
          setValue={setValue}
          inputClassName="max-w-80"
          // readOnly
          // {...register("name")}
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

        {/* Input TIME */}
        {watch("frequency") == "Daily" ? (
          <InputTimePicker
            currentValue={moment(watch("time")).format("H:mm A")}
            label="Time"
            name={"time"}
            className={"w-80"}
            setValue={setValue}
          />
        ) : watch("frequency") == "Weekly" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
            <InputTimePicker
              currentValue={moment(watch("time")).format("H:mm A")}
              label="Time"
              name={"time"}
              className={"w-80"}
              setValue={setValue}
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
        ) : watch("frequency") == "Once" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
            <InputTimePicker
              currentValue={moment(watch("time")).format("H:mm A")}
              label="Time"
              name={"time"}
              className="flex-1 max-w-80"
              setValue={setValue}
            />
            <InputDateTimePicker
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
          <ButtonDefault
            color={"white"}
            text={"Discard"}
            type="reset"
            action={() => reset()}
          />
          <ButtonDefault color={"base"} text="Save" type="submit" />
        </div>
      </form>
    </div>
  );
}
