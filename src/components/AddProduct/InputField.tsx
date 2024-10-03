import React from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  fieldRequired: boolean;
  register: UseFormRegister<any>;
  errors: any;
}

const InputField: React.FC<InputFieldProps> = ({
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
        className="block self-stretch text-gray-500 text-sm font-medium font-inter leading-[21px]"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-gray-300 text-sm font-normal font-inter leading-[17.50px]"
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

export default InputField;
