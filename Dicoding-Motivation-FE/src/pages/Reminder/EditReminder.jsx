import { useParams } from "react-router";
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

export default function EditReminder() {
  const { id } = useParams();
  const DetailReminder = DataRemainder[id - 1];

  const { control, setValue, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      name: DetailReminder.name,
      days: DetailReminder.time.days || [0, 0, 0, 0, 0, 0, 0], // Initialize no reminders
      date: DetailReminder.time.time,
      frequency: DetailReminder.frequency,
      selectedContents: DetailReminder.contents.map((content) => ({
        id: content.id,
        title: content.title,
        selected: content.selected,
      })),
    },
  });

  const selectedContents = watch("selectedContents");

  // Check if all items are selected
  const isAllSelected = selectedContents.every((content) => content.selected);

  // Handle individual checkbox changes
  const handleCheckboxChange = (index) => {
    const updatedContents = [...selectedContents];
    updatedContents[index].selected = !updatedContents[index].selected;
    setValue("selectedContents", updatedContents);
  };

  // Handle "Select All" checkbox change
  const handleSelectAllChange = () => {
    const updatedContents = selectedContents.map((content) => ({
      ...content,
      selected: !isAllSelected,
    }));
    setValue("selectedContents", updatedContents);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

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

        {/* Attach Content */}
        <div className="flex flex-col">
          <p className="font-bold text-theme-base text-lg mb-2">
            Attach Content
          </p>

          {/* Individual Checkboxes */}
          {selectedContents.map((content, index) => (
            <InputCheckbox
              key={content.id}
              name={`selectedContents[${index}]`}
              label={content.title}
              value={content.id}
              checked={content.selected}
              onChange={() => handleCheckboxChange(index)}
            />
          ))}

          {/* "Select All" Checkbox */}
          <InputCheckbox
            name="selectAll"
            label="All"
            value="all"
            checked={isAllSelected}
            onChange={handleSelectAllChange}
          />
        </div>

        {/* Input Frequency */}
        <InputButtonSelect
          name="frequency"
          label="Select a Category"
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "once", label: "Once" },
          ]}
          currentValue={watch("frequency")}
          buttonClassName="hover:bg-blue-100"
          selectedClassName="border-blue-500"
          setValue={setValue}
        />

        {/* Input Time */}
        {watch("frequency") === "daily" ? (
          <InputTimePicker
            currentValue={moment(watch("date")).format("H:mm A")}
            label="Time"
            name="date"
            className="w-80"
            setValue={setValue}
          />
        ) : watch("frequency") === "weekly" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
            <InputTimePicker
              currentValue={moment(watch("date")).format("H:mm A")}
              label="Time"
              name="date"
              className="w-80"
              setValue={setValue}
            />
            <InputButtonSelectDays
              label="Days"
              name="days"
              control={control}
              buttonClassName="hover:bg-blue-100"
            />
          </div>
        ) : watch("frequency") === "once" ? (
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
            <InputTimePicker
              currentValue={moment(watch("date")).format("H:mm A")}
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
