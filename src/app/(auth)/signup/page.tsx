"use client";
import Link from "next/link";
import { Button } from "flowbite-react";
import { failure } from "@/utils/notifications";
import { signInWithGooglePopup } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const router = useRouter();
  const logGoogleUser = async () => {
    try {
      const response: any = await signInWithGooglePopup();
      const accessToken = response?._tokenResponse?.oauthAccessToken;
      const { email, displayName } = response?.user;
      router.push(
        `/signup-process?email=${email}&name=${displayName}&token=${accessToken}`
      );
    } catch (error: any) {
      failure(error.message);
    }
  };

  return (
    <div className="animate__animated animate__zoomIn h-fit bg-white rounded-3xl mr-[122px] mt-[90px] p-10">
      <div className="text-center mt-[30px] hover:animate__animated hover:animate__hinge">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter'] ">
          Create a{" "}
        </span>
        <span className="text-blue-600 text-2xl font-bold font-['Inter']">
          Vendor
        </span>
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          {" "}
          Account
        </span>
      </div>
      <div className="SupportingText  w-[369px] text-center text-slate-500 text-bold text-md  mt-2 font-['Inter'] ">
        Unleash great opportunities as a vendor here{" "}
      </div>

      <div className="flex justify-center flex-col gap-2 mt-2">
        <Link
          className=" text-slate-500 h-[43px] text-base font-medium font-['Inter'] mt-2  px-10 py-3 rounded-[13px] shadow border-2 border-slate-500 justify-center items-center gap-2 inline-flex hover:border-blue-500 hover:text-blue-500"
          href="/signup-process"
        >
          Continue with Email
        </Link>
        <div className="Text text-slate-500 text-sm text-center font-bold font-['Inter'] ">
          OR
        </div>
        <button className="btn h-[43px]" onClick={logGoogleUser} type="button">
          <FcGoogle className="mr-2 text-lg" />
          Continue with Google
        </button>
      </div>
      <div className="flex flex-row justify-center mt-4">
        <div className="Text text-slate-500 text-md font-normal font-['Inter']">
          Already have an account?
        </div>
        <Link
          href="/signin"
          className="Text ml-2 text-zinc-800 text-md font-bold font-['Inter'] hover:text-blue-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
