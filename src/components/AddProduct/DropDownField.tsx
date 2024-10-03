import React, { useState } from "react";
import { FieldValues, FieldError, UseFormRegister } from "react-hook-form";
import Select from "react-select";

interface InputFieldProps {
  name: string;
  placeholder: string;
  label: string;
  type: string;
  fieldRequired: boolean;
  register: UseFormRegister<any>;
  errors: any;
  data?: any;
  setValue?: any;
  clearErrors?: any;
  isLoading?: any;
  watch?: any;
}

const DropDownField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  register,
  label,
  type,
  fieldRequired,
  data,
  errors,
  setValue,
  clearErrors,
  isLoading,
  watch,
}) => {
  const options = data?.map((option: any) => ({
    value: option._id,
    label: option.name,
  }));
  const handleChange = (selectedOption: any, actionMeta: any) => {
    setValue(name, selectedOption.value);
    clearErrors(name);
  };

  return (
    <div className="w-full  flex-col justify-start items-start gap-2 inline-flex">
      <label
        id={name}
        className="block self-stretch text-gray-500 text-sm font-medium font-inter leading-[21px]"
      >
        {label}
      </label>

      <Select
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isLoading={isLoading}
        className="w-full rounded-lg"
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          control: (provided, state) => ({
            ...provided,
            borderRadius: "8px",
            backgroundColor: "rgb(249, 250, 251)",
            fontSize: "14px",
          }),
        }}
        value={options?.find((option: any) => option.value === watch!(name))}
      />

      {errors?.[name] && (
        <span className="text-red-400 text-sm font-inter">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

export default DropDownField;
