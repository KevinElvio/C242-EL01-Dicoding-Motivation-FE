export default function InputCheckbox({
  name,
  checkboxClassName,
  labelClassName,
  label,
  value,
  checked,
  onChange,
}) {
  return (
    <label
      className={`flex items-center gap-4 font-semibold text-theme-base ${
        labelClassName ?? ""
      }`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`outline-none border-2 border-theme-base w-4 h-4 accent-theme-base ${
          checkboxClassName ?? ""
        }`}
        // required
      />
      {label}
    </label>
  );
}
