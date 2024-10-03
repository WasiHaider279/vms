"use client"
import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useVerifyEmailMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useResendVerificationEmailMutation } from "@/redux/services/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";

const CheckMail = () => {
 
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();
    const searchParams = useSearchParams();
  const router = useRouter();
    let email = searchParams.get("email");
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = () => {
      resendEmail({ email: email })
        .unwrap()
        .then((res) => {
          console.log(res);
          success("Email Sent Successfully. Please check your email");
        })
        .catch((err) => {
          failure(err.data.message);
        });
    };
  return (
    <div className="w-[478px] h-[318px] bg-white rounded-3xl mr-[122px] mt-[90px] ">
      <div className="Text w-[369px] text-center mt-[47px] ml-[54.5px]">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          Check your email
        </span>
      </div>
      <p className=" text-slate-500 text-base font-normal font-['Inter'] leading-normal mt-2 text-center">
        We send a password reset link <br />
      </p>

      <Link href="/signin" className="flex justify-center flex-col gap-4 mt-6">
        <button className=" ml-[54.5px] mr-[54.5px] text-md font-medium font-['Inter'] btn" >
          Sign In
        </button>
      </Link>
      <div className="flex flex-row justify-center mt-6">
        <div className="Text text-slate-500 text-md font-medium font-['Inter']">
          Didn’t receive the email ?
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <button
            type="submit"
            className="Text ml-2 text-zinc-800 text-md font-medium font-['Inter'] hover:text-blue-500"
          >
            Click to resend
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckMail;
