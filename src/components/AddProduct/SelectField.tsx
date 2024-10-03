import React from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
}

const SelectField: React.FC<InputFieldProps> = ({
  register,
  label,
  type,
  name,
}) => {
  return (
    <div className="w-full my-3">
      <label
        htmlFor="billing-from"
        className="block text-sm font-medium text-gray-700"
      >
        Country/Region of origin:
      </label>
      <select
        id="region"
        className="mt-1 p-1 border rounded-lg w-full"
        {...register("region", {
          required: "country is required",
        })}
      >
        <option value="pakistan">Pakistan</option>
        <option value="uk">UK</option>
        <option value="canada">Canada</option>
      </select>
    </div>
  );
};

export default SelectField;
