import React from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  fieldRequired: boolean;
  register: UseFormRegister<any>;
  // errors: { [key: string]: FieldError };
  errors: any;
}

const TextAreaField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  register,
  label,
  type,
  fieldRequired,
  errors,
}) => {
  return (
    <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
      <label
        htmlFor={name}
        className="self-stretch text-zinc-800 text-sm font-medium font-inter"
      >
        {label}
      </label>
      <textarea
        rows={7}
        placeholder={placeholder}
        className="px-4 py-3 rounded-lg w-full bg-white border-zinc-100 placeholder-gray-300 text-black text-sm font-normal font-inter"
        {...register(`${name}`, {
          required: fieldRequired ? `${name} is required!` : false,
        })}
      />
      {errors?.[name] && (
        <span className="text-red-400 text-sm font-inter">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

export default TextAreaField;
