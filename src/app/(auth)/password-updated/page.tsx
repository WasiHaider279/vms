"use client";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { resetPasswordValidationSchema } from "@/utils/validations";
// import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/global/Input";
// import Button from "@/components/global/Button";
import Form from "@/components/global/Form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";

const UpdatedPassword = () => {
  const [password, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  let token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const onSubmit = (formData: any) => {
    password({ token, ...formData })
      .unwrap()
      .then(() => {
        success("Check your email to reset password.");
        router.push(`/signin`);
      })
      .catch((error) => {
        failure(error?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="w-[478px] h-[320px] bg-white rounded-3xl mr-[122px] mt-[90px] flex flex-col gap-4 p-8 ">
      <div className="Text text-center mt-[47px] ">
        {/* <span className="text-green-700 text-2xl font-bold font-['Inter']">
          Update
        </span> */}
        {/* <span className="text-blue-600 text-2xl font-bold font-['Inter']">
          Vendor
        </span> */}
        <span className="text-green-700 text-2xl font-bold font-['Inter']">
          {" "}
          Successful!
        </span>
      </div>
      <div className="SupportingText  text-center text-slate-500 text-base font-normal font-['Inter'] ">
        Password Updated
      </div>
    <p className="text-body-text text-center text-sm font-medium font-inter">Your password has been updated. <br/>Please login with the new password.</p>
      {/* <form className="ml-[54.5px] mr-[54.5px] flex max-w-md flex-col mt-2 gap-6" 
      onSubmit={handleSubmit(onSubmit)}
      
      
      > */}
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Email/Phone Number" />
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
            {...register("email")}
          />
        </div> */}
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="New Password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            required
            shadow
            // {...register("newPassword")}
          />
        </div> */}
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm Password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            required
            shadow
            {...register("confirmPassword")}
          />
        </div> */}

        {/* <Link href="/forgot-password" className="Text text-right text-slate-500 text-sm font-normal font-['Inter'] underline">
          Forgot Password?
        </Link> */}
        <Link href="/signin"><Button className="w-full" type="submit">Back to Login</Button></Link>
      {/* </form> */}
      {/* <div className="flex justify-center">
        <div className="Text text-slate-500 text-sm font-normal font-['Inter'] mt-2">
          OR
        </div>
      </div> */}
      {/* <div className="mt-2 ml-[54.5px] ButtonBase w-[369px] h-[43px] pl-10 pr-8 py-3 rounded-[13px] shadow border-2 border-slate-500 justify-center items-center gap-2 inline-flex">
        <div className="Text grow shrink basis-0 text-center text-slate-500 text-base font-medium font-['Inter']">
          Continue with Google
        </div>
      </div> */}
      {/* <div className="flex flex-row justify-center mt-2">
        <div className="Text text-slate-500 text-sm font-normal font-['Inter']">
          Don’t have an account?
        </div>
        <Link href="/signup" className="Text text-zinc-800 text-sm font-medium font-['Poppins']">
          Sign Up
        </Link>
      </div> */}
    </div>
  );
};

export default UpdatedPassword;
