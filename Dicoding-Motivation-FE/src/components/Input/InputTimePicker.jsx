// import moment from "moment";
// import { useState } from "react";
import DatePicker from "react-datepicker";

export default function InputTimePicker({
  name,
  label,
  readOnly,
  currentValue,
  setValue,
  className,
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-theme-base font-bold text-lg">
        {label}
      </label>
      <DatePicker
        selected={currentValue instanceof Date ? currentValue : null}
        onChange={(date) => setValue(name, date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="HH:mm a"
        showTimeCaption={false}
        readOnly={readOnly}
        className="px-4 py-2 outline-none border border-theme-base rounded-md"
        // timeClassName={"w-80"}
        customInput={<input className="w-80" />}
        name={name}
        required
        {...rest}
      />
    </div>
  );
}
