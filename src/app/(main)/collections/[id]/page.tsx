"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import Container from "@/components/global/Container";
import EditAutoCondition from "@/components/collections/AddAutoConditions";
import { IInputs } from "@/types/collectionsTypes";
import AddProductsManual from "@/components/collections/AddProductsManual";

const testJson: any = {
  id: 1,
  name: "Test Collection",
  products: [
    {
      id: 1,
      name: "Product 1",
    },
    {
      id: 2,
      name: "Product 2",
    },
    {
      id: 3,
      name: "Product 3",
    },
  ],
};

const EditCollection = () => {
  const [type, setType] = useState<String>("manual");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    defaultValues: {
      conditions: [{ field: "", condition: "", statement: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions",
  });

  const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data);

  return (
    <Container title="Add Collection">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title and desc */}
        <div className="bg-gray-200 p-4">
          <section className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
            />
          </section>
          <section className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea {...register("description", { required: true })} />
          </section>
        </div>
        {/* image */}
        <div className="bg-gray-200 p-4">
          <h1>Media</h1>
          <input type="file" />
        </div>r
        {/* collection type */}
        <div className="bg-gray-200 p-4">
          {/* conditions for type auto*/}
          <section className={`${type === "auto" ? "block" : "hidden"}`}>
            <h1>conditions</h1>
            {fields.map((field, index) => (
              <div key={field.id}>
                <EditAutoCondition
                  register={register}
                  index={index}
                  remove={remove}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({ field: "", condition: "", statement: "" })
              }
            >
              Add Condition
            </button>
          </section>
          {/* condition for type manual */}
          <section className={`${type === "manual" ? "block" : "hidden"}`}>
            <h1>Products</h1>
            <AddProductsManual collection={testJson} />
          </section>
        </div>
        {/* status */}
        <div className="bg-gray-200 p-4">
          <h1>Status</h1>
          <select {...register("status", { required: true })}>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
};

export default EditCollection;
