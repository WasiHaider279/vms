import React from "react";
import "../../../styles/global.css";

const Download = () => {
  return (
    <div className="relative">
      <div className="Navbar w-full h-[50px] p-6  gap-2  flex flex-row justify-between">
        <div className="Logo h-1 justify-start items-center gap-3 flex">
          <img
            className="IsmmartLogosCanva081 w-7 h-7"
            src="/assets/images/logo.png"
          />
          <div className="Ismmart text-black text-lg font-semibold font-['Inter'] leading-9">
            ISMMART
          </div>
        </div>
        <p className="text-blue-600 text-sm items-center flex font-semibold font-['Inter']  ">
          VMS
        </p>
      </div>
      <div
        className="w-full h-[400px] bg-cover "
        style={{
          backgroundImage: "url('/assets/images/siginbg.png')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col  justify-between">
          <div className="lg:pt-[106px]  lg:pl-[126px] p-4 text-white lg:text-6xl text-2xl font-bold font-['Inter']">
            Sell Your Products
            <br />
            On Pakistan’s
            <br />
            Best Store
          </div>{" "}
          <p className="GetTheApp ml-4 text-white text-lg font-medium font-['Inter'] leading-7 mt-4">
            Get the App
          </p>
          <div className="flex flex-col gap-2 ml-4 mt-2">
            <button>
              {" "}
              <img src="/assets/images/Layer 2.svg"></img>
            </button>
            <button>
              {" "}
              <img src="/assets/images/appstore.svg"></img>
            </button>
          </div>
        </div>
      </div>
      {/* second section */}
      <div className="grid grid-cols-2 gap-4 m-2">
        <div className="flex flex-row gap-2">
          <img className="w-10 h-10" src="/assets/images/truck.svg"></img>
          <div className="FreeShipping  text-neutral-900 text-base font-normal font-['Inter'] capitalize">
            Free Shipping
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-10 h-10" src="/assets/images/phone.svg"></img>
          <div className=" text-neutral-900 text-base font-normal font-['Inter'] capitalize">
            24/7 Support
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-10 h-10" src="/assets/images/batwa.svg"></img>
          <div className=" text-neutral-900 text-base font-normal font-['Inter'] capitalize">
            Secure payment
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <img className="w-10 h-10" src="/assets/images/card.svg"></img>
          <div className=" text-neutral-900 text-base font-normal font-['Inter'] capitalize">
            20 % Discount Week
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="fixed bottom-0 text-white bg-black w-full z-40 p-2 text-center">
        © Copyright 2024 ismmart.com - All Rights Reserved.
      </div>
    </div>
  );
};

export default Download;
