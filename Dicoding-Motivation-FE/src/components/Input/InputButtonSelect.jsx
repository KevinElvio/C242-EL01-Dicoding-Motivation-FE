export default function InputButtonSelect({
  name,
  label,
  options = [],
  currentValue,
  setValue,
  readOnly,
  className = "",
  buttonClassName = "",
  selectedClassName = "",
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-theme-base text-lg font-bold">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`px-4 py-2 rounded-md ${
              readOnly ? "pointer-events-none cursor-pointer" : ""
            } ${
              currentValue === option.value
                ? `bg-theme-base text-white ${selectedClassName}`
                : `bg-gray-100 text-gray-800 ${buttonClassName}`
            }`}
            onClick={() => setValue(name, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
