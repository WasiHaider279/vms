"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { IUserFormData } from "@/types/users";

const AddUserPage = () => {
  const { register, handleSubmit } = useForm<IUserFormData>();
  const permissions = [
    { module: "shipping" },
    { module: "collections" },
    { module: "products" },
    { module: "orders" },
  ];

  const onSubmit = (data: IUserFormData) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <h2 className="text-lg font-bold mt-4 mb-2">Permissions</h2>
        <div>
          {permissions.map((module, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-bold mb-2">{module.module}</h3>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  {...register(`permissions.${index}.read`)}
                  className="mr-2"
                />
                Read
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  {...register(`permissions.${index}.write`)}
                  className="mr-2"
                />
                Write
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  {...register(`permissions.${index}.update`)}
                  className="mr-2"
                />
                Update
              </label>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  {...register(`permissions.${index}.delete`)}
                  className="mr-2"
                />
                Delete
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
