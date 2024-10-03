"use client";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Stepper from "@/components/global/Stepper";
import BasicInfo from "@/components/SignupSteps/Step1";
import StoreInfo from "@/components/SignupSteps/Step2";
import BankDetails from "@/components/SignupSteps/Step3";
import { Button, Label, TextInput } from "flowbite-react";
import Step4 from "@/components/SignupSteps/Step4";

const SignupStepPage = () => {
  const [stores, setStores] = useState([]);
  const [email, setEmail] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const steps = [
    "Account Creation",
    "Store Information",
    "Bank Information",
    "Account Status",
  ];
  const searchParams = useSearchParams();
  let type = Number(searchParams.get("type"));
  // const [stepper, setStepper] = useState([true, false, false]);
  // const [completed, setCompleted] = useState([false, false, false]);
  const router = useRouter();

  // const nextState = () => {
  //   if (type < stepper.length - 1) router.push(`/signup?type=${type + 1}`);
  //   setStepper((prev) =>
  //     prev.map((step, index) => (index === type + 1 ? true : step))
  //   );
  //   setCompleted((prev) =>
  //     prev.map((complete, index) => (index === type ? true : complete))
  //   );
  // };

  // const prevState = () => {
  //   if (type > 0) router.push(`/signup?type=${type - 1}`);
  //   setStepper((prev) =>
  //     prev.map((step, index) => (index === type + 1 ? false : step))
  //   );
  //   setCompleted((prev) =>
  //     prev.map((complete, index) => (index === type ? false : complete))
  //   );
  // };

  return (
    <section className="">
      {activeStep === 0 && (
        <p className="text-center">
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            Create a{" "}
          </span>
          <span className="text-blue-600 text-[25px] font-semibold font-['Inter']">
            Vendor
          </span>
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            {" "}
            Account
          </span>
        </p>
      )}
      {activeStep === 1 && (
        <p className="text-center">
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            Add{" "}
          </span>
          <span className="text-blue-600 text-[25px] font-semibold font-['Inter']">
            Store
          </span>
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            {" "}
            Information
          </span>
        </p>
      )}
      {activeStep === 2 && (
        <p className="text-center">
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            Add{" "}
          </span>
          <span className="text-blue-600 text-[25px] font-semibold font-['Inter']">
            Bank
          </span>
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            {" "}
            Details
          </span>
        </p>
      )}
      {activeStep === 3 && (
        <p className="text-center">
          <span className="text-blue-600 text-[25px] font-semibold font-['Inter']">
            Vendor Profile
          </span>
          <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
            {" "}
            Submitted!!
          </span>
        </p>
      )}
      <div className="flex justify-center mt-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-50 h-16  rounded-lg cursor-pointer ${
              activeStep === index ? " text-blue-700" : " text-black"
            }`}
          >
            {activeStep === index ||
              (activeStep >= index && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                  >
                    <path
                      d="M16.394 7.41059L15.7205 6.73634C15.578 6.59459 15.5 6.40559 15.5 6.20534V5.25134C15.5 4.01084 14.4905 3.00134 13.25 3.00134H12.296C12.0988 3.00134 11.9053 2.92109 11.7658 2.78159L11.0915 2.10734C10.214 1.22984 8.78753 1.22984 7.91003 2.10734L7.23428 2.78159C7.09478 2.92109 6.90128 3.00134 6.70403 3.00134H5.75003C4.50953 3.00134 3.50003 4.01084 3.50003 5.25134V6.20534C3.50003 6.40559 3.42203 6.59459 3.28028 6.73634L2.60603 7.40984C2.18078 7.83509 1.94678 8.40059 1.94678 9.00134C1.94678 9.60209 2.18153 10.1676 2.60603 10.5921L3.27953 11.2663C3.42203 11.4081 3.50003 11.5971 3.50003 11.7973V12.7513C3.50003 13.9918 4.50953 15.0013 5.75003 15.0013H6.70403C6.90128 15.0013 7.09478 15.0816 7.23428 15.2211L7.90853 15.8961C8.34728 16.3341 8.92328 16.5531 9.49928 16.5531C10.0753 16.5531 10.6513 16.3341 11.09 15.8953L11.7643 15.2211C11.9053 15.0816 12.0988 15.0013 12.296 15.0013H13.25C14.4905 15.0013 15.5 13.9918 15.5 12.7513V11.7973C15.5 11.5971 15.578 11.4081 15.7205 11.2663L16.394 10.5928C16.8185 10.1676 17.0533 9.60284 17.0533 9.00134C17.0533 8.39984 16.8193 7.83509 16.394 7.41059ZM12.9163 8.12534L8.41628 11.1253C8.28953 11.2101 8.14403 11.2513 8.00003 11.2513C7.80653 11.2513 7.61453 11.1763 7.46978 11.0316L5.96978 9.53159C5.67653 9.23834 5.67653 8.76434 5.96978 8.47109C6.26303 8.17784 6.73703 8.17784 7.03028 8.47109L8.09528 9.53609L12.0838 6.87734C12.4295 6.64709 12.8945 6.74009 13.124 7.08509C13.3543 7.43009 13.2613 7.89584 12.9163 8.12534Z"
                      fill="#1A56DB"
                    />
                  </svg>
                </>
              ))}
            {step}

            {index !== steps.length - 1 && (
              <div className="w-[100px] h-1 border-dotted border-t border-gray-400 mx-10 mt-2"></div>
            )}
          </div>
        ))}
      </div>
      <div
        className="m-[50px] flex items-center justify-center"
        style={{ height: "1px", background: "#D9D9D9" }}
      ></div>
      {activeStep === 0 && (
        <BasicInfo setEmail={setEmail} setActiveStep={setActiveStep} />
      )}
      {activeStep === 1 && (
        <StoreInfo setActiveStep={setActiveStep} setStores={setStores} />
      )}
      {activeStep === 2 && (
        <BankDetails setActiveStep={setActiveStep} stores={stores} />
      )}
      {activeStep === 3 && <Step4 email={email} />}
    </section>
  );
};

export default SignupStepPage;
