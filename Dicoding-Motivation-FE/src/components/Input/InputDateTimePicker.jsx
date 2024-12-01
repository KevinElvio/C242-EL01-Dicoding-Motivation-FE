import React from "react";
import DatePicker from "react-datepicker";
import { RiCalendarEventLine } from "react-icons/ri";

export default function InputDateTimePicker({
  name,
  label,
  readOnly,
  currentValue,
  setValue,
  className,
  ...rest
}) {
  // const [startDate, setStartDate] = useState(new Date());

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div className="flex rounded-md w-80 border border-theme-base px-4 py-2 justify-between">
        <label onClick={props.onClick} ref={ref}>
          {props.value || props.placeholder}
        </label>
        <RiCalendarEventLine
          className="w-6 h-6 text-theme-base"
          onClick={props.onClick}
        />
      </div>
    );
  });

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-theme-base font-bold text-lg">
        {label}
      </label>
      <DatePicker
        selected={currentValue ? new Date(currentValue) : null}
        onChange={
          (date) => setValue(name, date) // Update form state
        }
        // value={currentValue}
        showTimeCaption={false}
        value={new Date(currentValue)}
        readOnly={readOnly}
        className="px-4 py-2 outline-none border border-theme-base rounded-md"
        // timeClassName={"w-80"}
        customInput={<CustomInput />}
        name={name}
        required
        {...rest}
      />
    </div>
  );
}
