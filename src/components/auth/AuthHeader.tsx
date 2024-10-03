"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthHeader = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="Navbar w-full h-[89px] p-6 justify-between  gap-8 inline-flex">
      <div className="Logo h-9 justify-start items-center gap-3 flex">
        <img
          alt="logo"
          className="IsmmartLogosCanva081 w-7 h-7"
          src="/assets/images/logo.png"
        />
        <div className="Ismmart text-black text-2xl font-semibold font-['Inter'] leading-9">
          ISMMART
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="Frame1000003844 justify-start items-center gap-2 flex">
          <div className="Pakistan w-3 h-3 relative">
            <div className="Group w-3 h-3 left-0 top-0 absolute"></div>
            <div className="Group w-[4.70px] h-[4.17px] left-[4.96px] top-[3.91px] absolute"></div>
          </div>
          {/* <div className="EnglishPkr text-sm">
          <span className="text-neutral-900 font-normal font-['Inter']">
            /
          </span>
          <span className="text-neutral-900  font-normal font-['Inter']">
            {" "}
            English{" "}
          </span>
          <span className="text-neutral-900 font-normal font-['Inter']">
            /
          </span>
          <span className="text-neutral-900  font-normal font-['Inter']">
            {" "}
            PKR
          </span>
        </div>
        <div className="GridiconsDropdown w-[15px] h-[15px] relative" /> */}
        </div>

        <Link
          href={
            pathname.toLowerCase().includes("signin") ? "/signup" : "/signin"
          }
          className="btn"
        >
          <p className="Text text-white text-sm font-medium font-['Inter']">
            {pathname.toLowerCase().includes("signin") ? "Sign up" : "Log in"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
