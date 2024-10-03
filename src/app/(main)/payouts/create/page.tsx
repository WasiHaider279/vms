"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IPayoutFormData } from "@/types/payoutsTypes";
import {
  Datepicker,
  Button,
  FloatingLabel,
  RangeSlider,
  Select,
} from "flowbite-react";

const PayoutPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPayoutFormData>();

  const onSubmit: SubmitHandler<IPayoutFormData> = (data) => console.log(data);

  return (
    <main>
      <h1 className="text-[1.875rem] font-[700] leading-[2.8125rem]">
        Create Payout
      </h1>
      <section className="border-2 border-gray-300 p-4 rounded-lg mt-3">
        <p>Payout Details</p>
        <hr />
        <form className="mt-[2.03rem] ml-[1rem] grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Datepicker />
          <Select id="countries" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <FloatingLabel variant="outlined" label="Address" />
          <div>
            <FloatingLabel variant="outlined" label="Address" />
            <RangeSlider />
          </div>
          <Select id="countries" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
          <div className="col-span-2 flex justify-end gap-[1rem]">
            <Button color="blue" outline>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PayoutPage;
