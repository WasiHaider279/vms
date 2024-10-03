"use client";
import React from "react";
import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import OtpInput from "react-otp-input";

const Otp = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="w-[478px] h-[350px] bg-white rounded-3xl mr-[122px] mt-[90px] ">
      <div className="Text w-[369px] text-center mt-[47px] ml-[54.5px]">
        <span className="text-neutral-900 text-2xl font-bold font-['Inter']">
          Enter OTP
        </span>
      </div>
      <p className=" text-slate-500 text-base font-normal font-['Inter'] leading-normal mt-2 text-center">
        We require your registered email address
      </p>
      <div
        id="otp"
        className="flex flex-row justify-center text-center px-2 mt-5"
      >
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          id="first"
          // maxlength="1"
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          id="second"
          // maxlength="1"
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          id="third"
          // maxlength="1"
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          id="fourth"
          // maxlength="1"
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          id="fifth"
          // maxlength="1"
        />
        <input
          className="m-2 border h-10 w-10 text-center form-control rounded"
          type="text"
          id="sixth"
          // maxlength="1"
        />
      </div>
      <div className=" text-gray-500 text-sm font-normal font-['Inter'] text-center">Enter a number between 0 and 9</div>

      <div className="flex justify-center flex-col gap-4 mt-2">
        <Button className=" ml-[54.5px] mr-[54.5px]" type="submit">
          Confirm
        </Button>
      </div>
      <div className="flex flex-row justify-center mt-4">
        <div className="Text text-slate-500 text-sm font-normal font-['Inter']">
        Didn’t receive the code ?
        </div>
        <div className="Text text-zinc-800 text-sm font-medium font-['Poppins']">
        Click to resend
        </div>
      </div>
    </div>
  );
};

export default Otp;
