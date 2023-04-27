import { useState } from "react";

interface InputFieldProps {
  name?: string;
  label?: string;
  onValueChange: (arg0: string) => void;
  initialValue?: string;
}

export function InputField({ name, label, onValueChange: onValueChange, initialValue }: InputFieldProps) {
  const [value, setValue] = useState(initialValue || "");

  function onValueChangeInternal(event: any) {
    setValue(event.target.value)
    onValueChange && onValueChange(value)
  }
  
  return (
    <>
      <label>{label}</label>
      <input type="text" name={name} onChange={onValueChangeInternal} value={value} />
    </>
  );
}
