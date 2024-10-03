"use client";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { resetPasswordValidationSchema } from "@/utils/validations";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, TextInput } from "flowbite-react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState("");
  const [password, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  let resetPasswordToken = searchParams.get("resetPasswordToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: any) => {
    password({ resetPasswordToken, ...formData })
      .unwrap()
      .then(() => {
        success("Password reset successfully");
        router.push(`/signin`);
      })
      .catch((error) => {
        failure(error?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="w-[478px] h-[430px] bg-white rounded-3xl mr-[122px] mt-[90px] ">
      <div className="Text w-[369px] text-center mt-[47px] ml-[54.5px]">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          Update
        </span>
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          {" "}
          Password
        </span>
      </div>
      <div className=" ml-[54.5px] w-[369px] text-center text-slate-500 text-base font-normal font-['Inter'] leading-normal">
        Set your new password
      </div>
      <form
        className="ml-[54.5px] mr-[54.5px] flex max-w-md flex-col mt-2 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="new_password" value="New Password" />
          </div>
        </div>
        <div className="relative">
          <input
            id="new_password"
            placeholder="enter new password"
            type={showPassword == "new_password" ? "text" : "password"}
            required
            className="input-field"
            {...register("new_password", {
              required: "new_password is required",
            })}
          />
          {errors.new_password && (
            <p className="text-red-500 italic">{`${errors.new_password.message}`}</p>
          )}
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            onClick={() => {
              if (showPassword == "new_password") {
                setShowPassword("");
              } else {
                setShowPassword("new_password");
              }
            }}
          >
            {showPassword == "new_password" ? (
              <IoMdEye className="text-slate-500" />
            ) : (
              <IoMdEyeOff className="text-slate-500" />
            )}
          </button>
        </div>
        <div className="mt-2 block">
          <Label htmlFor="confirm_password" value="Confirm Password" />
        </div>
        <div className="relative">
          <input
            id="confirm_password"
            placeholder="confirm your password"
            type={showPassword == "confirm_password" ? "text" : "password"}
            required
            className="input-field"
            {...register("confirm_password", {
              required: "confirm_password is required",
            })}
          />
          {errors.confirm_password && (
            <p className="text-red-500 italic">{`${errors.confirm_password.message}`}</p>
          )}
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            onClick={() => {
              if (showPassword == "confirm_password") {
                setShowPassword("");
              } else {
                setShowPassword("confirm_password");
              }
            }}
          >
            {showPassword == "confirm_password" ? (
              <IoMdEye className="text-slate-500" />
            ) : (
              <IoMdEyeOff className="text-slate-500" />
            )}
          </button>
        </div>
        {/* <div>
          <input
            id="confirm_password"
            type="password"
            required
            className="input-field"
            {...register("confirm_password")}
          />
        </div> */}

        <button className="btn mt-4" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
