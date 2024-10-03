// DynamicForm.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  register: UseFormRegister<any>;
  index: number;
  remove: (index?: number | number[] | undefined) => void;
}

const AddAutoCondition: React.FC<IProps> = ({ register, index, remove }) => {
  return (
    <div>
      <select
        {...register(`conditions[${index}].field` as const)}
        defaultValue=""
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <select
        {...register(`conditions[${index}].condition` as const)}
        defaultValue=""
      >
        <option value="contains">Contains</option>
        <option value="is">is equal to</option>
      </select>
      <input
        {...register(`conditions[${index}].statement` as const)}
        type="text"
        placeholder="Enter text"
      />
      <button type="button" onClick={() => remove(index)}>
        Delete
      </button>
    </div>
  );
};

export default AddAutoCondition;
