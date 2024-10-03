"use client";
import { Providers } from "@/redux/provider";
import Link from "next/link";
import "../../../styles/global.css";

import Notification from "@/components/global/Notification";

import { Button, Label, TextInput } from "flowbite-react";

import { useState } from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="relative " suppressHydrationWarning={true}>
        <Providers>
          {" "}
          {/* topbar */}
          <div className="Navbar w-full h-[89px] p-6   justify-between  gap-8 inline-flex">
            <div className="Logo h-9 justify-start items-center gap-3 flex">
              <img
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
                {/* <div className="EnglishPkr">
                  <span className="text-neutral-900 text-[8px] font-normal font-['Poppins']">
                    /
                  </span>
                  <span className="text-neutral-900 text-[10px] font-normal font-['Poppins']">
                    {" "}
                    English{" "}
                  </span>
                  <span className="text-neutral-900 text-[8px] font-normal font-['Poppins']">
                    /
                  </span>
                  <span className="text-neutral-900 text-[10px] font-normal font-['Poppins']">
                    {" "}
                    PKR
                  </span>
                </div> */}
                <div className="GridiconsDropdown w-[15px] h-[15px] relative" />
              </div>
              <div className="Cta justify-start items-center gap-4 flex">
                <Link
                  href="/signin"
                  className="Button px-5 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 flex"
                >
                  <div className="Text text-white text-sm font-medium font-['Inter'] leading-[21px]">
                    Log in
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {children}
          <div className="bg-[url('/assets/images/Banner.svg')] w-full h-[330px] bg-no-repeat bg-contain mt-10 ">
            <p className=" ml-[120px] pt-[60px] text-[#0E1216] text-shadow-[0px 2px 2px rgba(0, 0, 0, 0.15)] font-['Inter'] text-4xl font-bold capitalize">
              Sell your products on Pakistan&apos;s
              <br /> Best Store
            </p>
          </div>
          <div className="flex flex-row justify-around pt-4 pb-14">
            <div className="flex flex-row gap-2">
              <img src="/assets/images/truck.svg"></img>
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                Free Shipping
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <img src="/assets/images/phone.svg"></img>
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                24/7 Support
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <img src="/assets/images/batwa.svg"></img>
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                Secure payment
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <img src="/assets/images/card.svg"></img>
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                20 % Discount Week
              </div>
            </div>
          </div>
          {/* foooter */}
          <Notification />
        </Providers>
        <div className="fixed bottom-0 text-white bg-black w-full z-40 p-2 text-center">
          © Copyright 2024 ismmart.com - All Rights Reserved.
        </div>
      </body>
    </html>
  );
};

export default SignupLayout;
