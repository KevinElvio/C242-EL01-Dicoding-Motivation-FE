import { useController } from "react-hook-form";

export default function InputButtonSelectDays({
  label,
  name,
  control,
  readOnly = false,
  className = "",
  buttonClassName = "",
  selectedClassName = "",
}) {
  const {
    field: { value = [0, 0, 0, 0, 0, 0, 0], onChange },
  } = useController({
    name,
    control,
    defaultValue: [0, 0, 0, 0, 0, 0, 0], // Default to no days selected
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (index) => {
    if (readOnly) return;
    const updatedValue = [...value];
    updatedValue[index] = updatedValue[index] === 0 ? 1 : 0; // Toggle between 0 and 1
    onChange(updatedValue); // Update the form value
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
              value[index] === 1
                ? `bg-theme-base text-white ${selectedClassName}`
                : `bg-gray-100 text-gray-800 ${buttonClassName}`
            }`}
            onClick={() => toggleDay(index)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
