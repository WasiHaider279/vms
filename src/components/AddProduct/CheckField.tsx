import React from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
}

const CheckField: React.FC<InputFieldProps> = ({
  register,
  label,
  type,
  name,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className="focus:outline-none focus:ring-0 w-4 h-4 rounded border bg-gray-50 border-gray-300 flex-col justify-center items-center gap-2.5 inline-flex"
        {...register(`${name}`, {
          required: false,
        })}
      />
      <label
        htmlFor={name}
        className="ml-2 text-zinc-800 text-xs font-normal font-inter leading-[18px}"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckField;
