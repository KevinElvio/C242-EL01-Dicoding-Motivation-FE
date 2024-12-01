export default function InputText({
  name,
  label,
  value,
  setValue,
  inputClassName,
  // ...rest
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-theme-base text-lg font-bold">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className={`outline-none border border-theme-base px-4 py-2 rounded-md ${inputClassName}`}
        value={value ?? null}
        onChange={(e) => setValue(name, e.target.value)}
        required
        // {...rest}
      />
    </div>
  );
}
