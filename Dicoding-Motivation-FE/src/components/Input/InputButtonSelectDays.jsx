import { useController } from "react-hook-form";

export default function InputButtonSelectDays({
  label,
  name,
  control,
  readOnly = false,
  className = "",
  buttonClassName = "",
  selectedClassName = "",
  defaultValueControl = [],
}) {
  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
    defaultValue: defaultValueControl,
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDay = (index) => {
    if (readOnly) return;
    const day = days[index];
    const updatedValue = value.includes(day)
      ? value.filter((d) => d !== day) // Remove if already selected
      : [...value, day]; // Add new selection

    onChange(updatedValue); // Update the form state
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-lg font-bold text-theme-base">{label}</label>
      <div className="flex flex-wrap gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            className={`px-4 py-2 rounded-md ${
              readOnly ? "pointer-events-none cursor-default" : ""
            } ${
              value.includes(day)
                ? `bg-theme-base text-white ${selectedClassName}`
                : `bg-gray-100 text-gray-800 ${buttonClassName}`
            }`}
            onClick={() => toggleDay(index)}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}
