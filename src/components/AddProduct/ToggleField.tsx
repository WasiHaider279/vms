import React from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label?: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  watch?: any;
}

const ToggleField: React.FC<InputFieldProps> = ({
  register,
  label,
  type,
  name,
  watch,
}) => {
  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg flex-col justify-start items-start gap-4 inline-flex">
      <div className="self-stretch text-gray-900 text-sm font-medium font-inter">
        Product Status
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type={type}
          className="sr-only peer"
          {...register(`${name}`, {
            required: false,
          })}
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        {watch(name) ? (
          <span className="ms-3 text-primary text-xs font-medium font-inter">
            Set Active
          </span>
        ) : (
          <span className="ms-3 text-gray-400 text-xs font-medium font-inter">
            Now Draft
          </span>
        )}
      </label>
    </div>
  );
};

export default ToggleField;
