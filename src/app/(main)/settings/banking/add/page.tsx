"use client";
import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISettingsBank } from "@/types/settingsTypes";
import { useAddBankMutation } from "@/redux/services/bankApi";
import { useRouter } from "next/navigation";
import Container from "@/components/global/Container";

function AddBank() {
  const router = useRouter();
  // db calls
  const [addBank, { isLoading: isUpdating }] = useAddBankMutation();
  // form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettingsBank>();
  const onSubmit: SubmitHandler<ISettingsBank> = (data) => {
    addBank(data);
    router.push("/settings/banking");
  };

  return (
    <Container title="Add Bank">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] w-full"
      >
        {/* title */}
        <div>
          <div className="mb-2 block">
            <Label
              className="text-[#6B7280]"
              htmlFor="title"
              value="Account Title *"
            />
          </div>
          <TextInput
            id="title"
            placeholder="Muhammad Ali"
            required
            {...register("title", {
              required: "This field is required",
              pattern: {
                value: /^^[a-zA-Z0-9\s]+$/i,
                message: "Only letters, numbers and space is allowed",
              },
            })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        {/* name */}
        <div>
          <div className="mb-2 block">
            <Label
              className="text-[#6B7280]"
              htmlFor="name"
              value="Bank Name *"
            />
          </div>
          <TextInput
            id="name"
            placeholder="Habib Bank Limited"
            {...register("name", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z\s]+$/i,
                message: "Only letters and space is allowed",
              },
            })}
            required
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        {/* iban */}
        <div>
          <div className="mb-2 block">
            <Label className="text-[#6B7280]" htmlFor="iban" value="IBAN *" />
          </div>
          <TextInput
            id="iban"
            placeholder="ABCDEF1234567890"
            {...register("iban", {
              required: "This field is required",
              pattern: {
                value: /^^[a-zA-Z0-9]+$/i,
                message: "Only letters and numbers are allowed",
              },
            })}
            required
          />
          {errors.iban && (
            <span className="text-red-500">{errors.iban.message}</span>
          )}
        </div>
        {/* account number */}
        <div>
          <div className="mb-2 block">
            <Label
              className="text-[#6B7280]"
              htmlFor="accountNumber"
              value="Account Number *"
            />
          </div>
          <TextInput
            id="accountNumber"
            placeholder="1234567890"
            {...register("accountNumber", {
              required: "This field is required",
              pattern: {
                value: /^[0-9]+$/i,
                message: "Only numbers are allowed",
              },
            })}
            required
          />
          {errors.accountNumber && (
            <span className="text-red-500">{errors.accountNumber.message}</span>
          )}
        </div>
        <div className="col-span-2 flex justify-end gap-[1rem]">
          <Button type="submit" color="blue">
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default AddBank;
