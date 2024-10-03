"use client";
import { setAuthToken } from "@/redux/features/authSlice";
import { useSignInMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import { signInValidationSchema } from "@/utils/validations";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/store";
import { signInWithGooglePopup } from "@/utils/firebaseConfig";
import Loader from "@/components/global/Loader";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { settings } from "firebase/analytics";
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: any) => {
    signIn(formData)
      .unwrap()
      .then((response) => {
        const status = response?.data?.status;

        if (status === "Approved") {
          success("Signin Successfully");
          dispatch(
            setAuthToken({
              token: response?.data?.token,
              status: response?.data?.status,
            })
          );
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else if (status === "Not Verified") {
          failure("Please verify your email");

          const queryString = `?token=${response?.data?.token}&email=${formData.email}`;
          router.push(`/check-your-mail2${queryString}`);
        } else if (status === "Rejected") {
          failure(
            "Your account is rejected. Please update your profile based on the feedback provided by the admin"
          );
          dispatch(
            setAuthToken({
              token: response?.data?.token,
              status: response?.data?.status,
            })
          );
          router.push("/settings");
          const settingsquery = `?response=${response?.data?.token}`;

          setTimeout(() => {
            router.push(`/settings${settingsquery}`);
          }, 2000);
        } else if (status === "Pending") {
          success("Your account is pending for approval");
          router.push("/profile-pending");
        }
      })
      .catch((error) => {
        failure(error?.data?.message || "An error occurred");
      });
  };

  const logGoogleUser = async () => {
    try {
      const response: any = await signInWithGooglePopup();
      const accessToken = response?._tokenResponse?.oauthAccessToken;
      onSubmit({ social: { name: "Google", token: accessToken } });
    } catch (error: any) {
      failure(error.message);
    }
  };

  return (
    <div className="w-[478px] h-[600px] bg-white rounded-3xl mr-[122px] mt-[90px] animate__animated animate__fadeInLeftBig">
      <div className="Text w-[369px] text-center mt-[47px] ml-[54.5px]">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          Sign in{" "}
        </span>
        <span className="text-blue-600 text-2xl font-bold font-['Inter']">
          Vendor
        </span>
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          {" "}
          Account
        </span>
      </div>
      <div className="SupportingText ml-[54.5px] w-[369px] text-center text-md text-slate-500 text-base font-normal font-['Inter'] mt-2">
        Unleash great opportunities as a vendor here{" "}
      </div>
      <form
        className="ml-[54.5px] mr-[54.5px] flex max-w-md flex-col mt-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email2"
              value="Email"
              className="text-slate-500 text-md"
            />
          </div>
          <input
            id="email2"
            className="input-field"
            type="email"
            placeholder="name@gmail.com"
            required
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 italic">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password2"
              value="Password"
              className="text-slate-500 text-md"
            />
          </div>
          <div className="relative">
            <input
              id="password2"
              type={showPassword ? "text" : "password"}
              required
              className="input-field"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 italic">{errors.password.message}</p>
            )}
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoMdEye className="text-slate-500" />
              ) : (
                <IoMdEyeOff className="text-slate-500" />
              )}
            </button>
          </div>
          {/* {errors.password && <p className="text-red-500">{errors.password.message}</p>} */}
        </div>

        <Link
          href="/forgot-password"
          className="Text text-right text-slate-500 text-md font-normal font-['Inter'] underline"
        >
          Forgot Password?
        </Link>
        <button className="text-lg btn h-[43px]" type="submit">
          <span className="pr-4 text-lg ">Sign in</span>{" "}
          {isLoading && <Loader h="20px" w="20px" color="#ffffff" />}
        </button>
      </form>
      <div className="flex justify-center">
        <div className="Text text-slate-500 text-sm font-bold font-['Inter'] mt-2">
          OR
        </div>
      </div>
      {/* <div className="mt-2 cursor-pointer ml-[54.5px] ButtonBase  w-[369px] h-[43px] rounded-[13px] shadow border-2 border-slate-500 justify-center items-center gap-2 inline-flex hover:border-blue-500"> */}

      <button
        onClick={logGoogleUser}
        className="mt-2 cursor-pointer ml-[54.5px] ButtonBase  w-[369px] h-[43px] rounded-[13px] shadow border-2 border-slate-500 justify-center items-center gap-2 inline-flex hover:border-blue-500  text-center text-slate-500 text-base font-medium font-['Inter']"
      >
        <FcGoogle />
        Signin with Google
      </button>
      {/* </div> */}
      <div className="flex flex-row justify-center mt-4">
        <div className="Text text-slate-500 text-md font-normal font-['Inter']">
          Don’t have an account?
        </div>
        <Link
          href="/signup"
          className="Text text-zinc-800 hover:text-blue-600 text-md font-bold font-['Inter'] ml-2 "
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
