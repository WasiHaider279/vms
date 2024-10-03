import React from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
}

const MultipleField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  register,
  label,
  type,
}) => {
  return (
    <div>
      <label htmlFor="multiselect">Select multiple options:</label>
      <select
        multiple
        {...register("multiselect")}
        id="multiselect"
        // className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      >
        {/* Replace this array with your actual options */}
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default MultipleField;
