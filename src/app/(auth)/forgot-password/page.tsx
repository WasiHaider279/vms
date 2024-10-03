"use client";
import { useForgotPasswordMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidationSchema } from "@/utils/validations";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/global/Loader";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const onSubmit = (formData: any) => {
    const { email } = formData;
    forgotPassword(formData)
      .unwrap()
      .then(() => {
        
        router.push(`/check-your-mail?email=${email}`)
      })
      .catch((error) => {
        failure(error?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="w-[478px] h-[350px] bg-white rounded-3xl mr-[122px] mt-[90px] ">
      <div className="Text w-[369px] text-center mt-[47px] ml-[54.5px]">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          Forgot Password?
        </span>
      </div>
      <p className=" text-slate-500 text-base font-normal font-['Inter'] leading-normal mt-2 text-center">
        We require your registered email address
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center flex-col gap-4 mt-2"
      >
        <div className="ml-[54.5px] mr-[54.5px]">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <input
            id="email"
            className="input-field"
            type="email"
            {...register("email")}
            placeholder="name@gmail.com"
            required
            
          />
        </div>
        <button
          disabled={isLoading}
          className="btn ml-[54.5px] mr-[54.5px]"
          type="submit"
        >
          Confirm
          {isLoading && <Loader h="10px" w="10px" />}{" "}
        </button>
      </form>
      <div className="flex flex-row justify-center mt-4">
        <div className="Text text-slate-500 text-md font-medium font-['Inter']">
          Remember your password?
        </div>
        <Link
          href="/signin"
          className="Text ml-2 text-zinc-800 text-md font-medium font-['Inter'] hover:text-blue-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
