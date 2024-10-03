"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import Container from "@/components/global/Container";
import AddAutoCondition from "@/components/collections/AddAutoConditions";
import { IInputs } from "@/types/collectionsTypes";

const AddCollection = () => {
  const [type, setType] = useState<String>("");

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
        </div>
        {/* collection type */}
        <div className="bg-gray-200 p-4">
          <h1>Collection Type</h1>
          <section>
            <input
              onClick={() => setType("")}
              {...register("type", { required: true })}
              type="radio"
              value="manual"
            />
            <label htmlFor="title">Manual</label>
          </section>
          <section>
            <input
              onClick={() => setType("auto")}
              {...register("type", { required: true })}
              type="radio"
              value="automated"
            />
            <label htmlFor="title">Automated</label>
          </section>
          {/* conditions for type */}
          <section className={`${type === "auto" ? "block" : "hidden"}`}>
            <h1>conditions</h1>
            {fields.map((field, index) => (
              <div key={field.id}>
                <AddAutoCondition
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

export default AddCollection;
