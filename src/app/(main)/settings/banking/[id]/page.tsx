"use client";
import React from "react";
import { Button, FloatingLabel, Label, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISettingsBank } from "@/types/settingsTypes";
import {
  useUpdateBankMutation,
  useGetBankQuery,
} from "@/redux/services/bankApi";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/global/Loader";
import Container from "@/components/global/Container";

function EditBank() {
  const bankID = useParams();
  const router = useRouter();

  // db calls
  const [updateBank, { isLoading: isUpdating }] = useUpdateBankMutation();
  const {
    data: bank,
    isLoading,
    isFetching,
  } = useGetBankQuery({ id: bankID.id });

  // form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISettingsBank>();
  const onSubmit: SubmitHandler<ISettingsBank> = (data) => {
    data.id = bank?.data?.items[0]._id;
    updateBank(data);
    router.push("/settings/banking");
  };

  if (isLoading) return <Loader />;
  return (
    bank && (
      <Container title="Edit Bank">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] w-full"
        >
          {/* title */}
          <div>
            <div className="mb-2 block">
              <Label
                className="text-[#6B7280] font-inter"
                htmlFor="title"
                value="Account Title *"
              />
            </div>
            <TextInput
              id="title"
              defaultValue={bank?.data?.items[0]?.title}
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
                className="text-[#6B7280] font-inter"
                htmlFor="name"
                value="Bank Name *"
              />
            </div>
            <TextInput
              id="name"
              defaultValue={bank?.data?.items[0]?.name}
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
              <Label
                className="text-[#6B7280] font-inter"
                htmlFor="iban"
                value="IBAN *"
              />
            </div>
            <TextInput
              id="iban"
              defaultValue={bank?.data?.items[0]?.iban}
              {...register("iban", {
                required: "This field is required",
                pattern: {
                  value: /^^[a-zA-Z0-9]+$/i,
                  message: "Only letters, numbers are allowed",
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
                className="text-[#6B7280] font-inter"
                htmlFor="accountNumber"
                value="Account Number *"
              />
            </div>
            <TextInput
              id="accountNumber"
              defaultValue={bank?.data?.items[0]?.accountNumber}
              {...register("accountNumber", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Only nyumbers are allowed",
                },
              })}
              required
            />
            {errors.accountNumber && (
              <span className="text-red-500">
                {errors.accountNumber.message}
              </span>
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-[1rem]">
            <Button type="submit" color="blue">
              Save
            </Button>
          </div>
        </form>
      </Container>
    )
  );
}

export default EditBank;
