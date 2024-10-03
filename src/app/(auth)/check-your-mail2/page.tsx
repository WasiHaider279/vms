"use client";

import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useVerifyEmailMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useResendVerificationEmailMutation } from "@/redux/services/authApi";
import { useForm } from "react-hook-form";
import Link from "next/link";

const CheckMail2 = () => {
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let token = searchParams.get("token");
  let email = searchParams.get("email");
  const onSubmit = (formData: any) => {
    resendEmail({ email: email })
      .unwrap()
      .then((res) => {
        success("Email Sent Successfully. Please check your email");
      })
      .catch((err) => {
        failure(err.data.message);
      });
  };
  useEffect(() => {
    if (token && !isApiCalled) {
      verifyEmail({ token: token })
        .unwrap()
        .then((res) => {
          success("Email Verified Successfully");
          setTimeout(() => {
            router.push("/profile-pending");
            1500;
          });
        })
        .catch((err) => {
          failure("Email Verification Failed");
          setIsApiCalled(true);
        })
        .finally(() => {
          setIsApiCalled(true); // Set the flag to true after the API call is complete
        });
    }
  }, [isApiCalled]);
  return (
    <div className="w-[478px] h-[318px] bg-white rounded-3xl mr-[122px] mt-[90px] ">
      <div className="Text w-[369px] text-center mt-[47px] ml-[54.5px]">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          Check your email
        </span>
      </div>
      <p className=" text-slate-500 text-md font-medium font-['Inter']  mt-2 text-center">
        We have sent you a verification email <br />
      </p>
      <p className=" text-slate-500 text-md font-medium font-['Inter']  mt-2 text-center">
      at {email} <br />
      </p>
      <button className=" ml-12  w-[369px] h-[43px] pl-10 pr-8 bg-blue-600 rounded-[13px] shadow items-center gap-2">
        <Link
          href="/signin"
          className="Text grow shrink basis-0 text-center text-gray-100 text-base font-medium font-['Inter']"
        >
          Sign In
        </Link>
      </button>
      <div className="flex flex-row justify-center mt-2">
        <div className="Text text-slate-500 text-md font-medium font-['Inter'] ">
          Didn’t receive the email ?
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="submit"
            className="Text ml-2 text-zinc-800 text-md font-medium font-['Inter']"
          >
            Click to resend
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckMail2;
