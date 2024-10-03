"use client";
import React from "react";
import "../../../../styles/global.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useVerifyEmailMutation } from "@/redux/services/authApi";
import { failure, success } from "@/utils/notifications";
import Loader from "@/components/global/Loader";
import { useEffect, useState } from "react";
import { useResendVerificationEmailMutation } from "@/redux/services/authApi";

const Verification = () => {
  const searchParams = useSearchParams();
  let token = searchParams.get("token");
  let email = searchParams.get("email");
  console.log(token, email, "token", "email");
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const steps = [
    "Account Creation",
    "Store Information",
    "Bank Information",
    "Account Status",
  ];
  const onSubmit = (formData: any) => {
    resendEmail({ email: email })
      .unwrap()
      .then((res) => {
        console.log(res);
        success("Email Sent Successfully. Please check your email");
      })
      .catch((err) => {
        failure(err.data.message);
      });
  };

  useEffect(() => {
    if (token && !isApiCalled) {
      verifyEmail({ token: token })
        .unwrap()
        .then((res) => {
          console.log(res);
          success("Email Verified Successfully");
          setTimeout(() => {
            router.push("/profile-pending");
            1500;
          });
        })
        .catch((err) => {
          failure("Email Verification Failed");
        })
        .finally(() => {
          setIsApiCalled(true); // Set the flag to true after the API call is complete
        });
    }
  }, [isApiCalled]);
  return (
    <div>
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

          <Link href="/signin" className="btn">
            Log in
          </Link>
        </div>
      </div>

      <p className="text-center">
        <span className="text-blue-600 text-[25px] font-semibold font-['Inter']">
          Vendor Profile
        </span>
        <span className="text-neutral-900 text-[25px] font-semibold font-['Inter']">
          {" "}
          Submitted!!
        </span>
      </p>

      <div className="flex justify-center mt-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-50 h-16 rounded-lg cursor-pointer text-black"
          >
            <>
              {index !== 3 && (
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
              )}
            </>
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

      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.192 9.87819L20.294 8.97919C20.104 8.79019 20 8.53819 20 8.27119V6.99919C20 5.34519 18.654 3.99919 17 3.99919H15.728C15.465 3.99919 15.207 3.89219 15.021 3.70619L14.122 2.80719C12.952 1.63719 11.05 1.63719 9.87996 2.80719L8.97896 3.70619C8.79296 3.89219 8.53496 3.99919 8.27196 3.99919H6.99996C5.34596 3.99919 3.99996 5.34519 3.99996 6.99919V8.27119C3.99996 8.53819 3.89596 8.79019 3.70696 8.97919L2.80796 9.87719C2.24096 10.4442 1.92896 11.1982 1.92896 11.9992C1.92896 12.8002 2.24196 13.5542 2.80796 14.1202L3.70596 15.0192C3.89596 15.2082 3.99996 15.4602 3.99996 15.7272V16.9992C3.99996 18.6532 5.34596 19.9992 6.99996 19.9992H8.27196C8.53496 19.9992 8.79296 20.1062 8.97896 20.2922L9.87796 21.1922C10.463 21.7762 11.231 22.0682 11.999 22.0682C12.767 22.0682 13.535 21.7762 14.12 21.1912L15.019 20.2922C15.207 20.1062 15.465 19.9992 15.728 19.9992H17C18.654 19.9992 20 18.6532 20 16.9992V15.7272C20 15.4602 20.104 15.2082 20.294 15.0192L21.192 14.1212C21.758 13.5542 22.071 12.8012 22.071 11.9992C22.071 11.1972 21.759 10.4442 21.192 9.87819ZM16.555 10.8312L10.555 14.8312C10.386 14.9442 10.192 14.9992 9.99996 14.9992C9.74196 14.9992 9.48596 14.8992 9.29296 14.7062L7.29296 12.7062C6.90196 12.3152 6.90196 11.6832 7.29296 11.2922C7.68396 10.9012 8.31596 10.9012 8.70695 11.2922L10.127 12.7122L15.445 9.16719C15.906 8.86019 16.526 8.98419 16.832 9.44419C17.139 9.90419 17.015 10.5252 16.555 10.8312Z"
              fill="#07D38F"
            />
          </svg>
          <p
            className="text-center font-['Inter'] text-2xl font-semibold"
            style={{ color: "var(--Label-Off-Green, #07D38F)" }}
          >
            Email Verification
          </p>
        </div>
        <p className="text-center text-xl text-slate-500 font-medium">
          Please wait while we are verifying your email. This may take a few
          seconds.
        </p>
        {isVerifying && <Loader />}
        <form
          className="flex flex-row justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <Link href="/signin" className="Cta justify-start items-center gap-4 flex"> */}

          <p className="text-center text-xl text-slate-500 font-medium">
            Didn&apos;t recieve the email or verification fails, then click to{" "}
            <button className="font-bold font-xl text-black" type="submit">
              Resend Email.
            </button>
          </p>

          {/* <button  disabled={true} type="submit" className="Button px-5 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 flex">
              <div className="Text text-white text-sm font-medium font-['Inter'] leading-[21px]">
                Login
              </div>
            </button> */}
        </form>
        {/* </Link> */}
      </div>
      <div className="bg-[url('/assets/images/Banner.svg')] w-full h-[330px] bg-no-repeat bg-contain mt-10 ">
        <p className=" ml-[120px] pt-[60px] text-[#0E1216] text-shadow-[0px 2px 2px rgba(0, 0, 0, 0.15)] font-['Inter'] text-4xl font-bold capitalize">
          Sell your products on Pakistan&apos;s
          <br /> Best Store
        </p>
      </div>
      <div className="flex flex-row justify-around">
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
      <div className="Frame1000003859 mt-5 w-full h-[54px] px-[120px] pb-[18px] bg-neutral-900 flex-col justify-center items-center gap-[18px] inline-flex">
        <div className="Copyright2022IsmmartComAllRightsReserved self-stretch text-center text-white text-xs font-medium font-['Poppins']">
          © Copyright 2022 ismmart.com - All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Verification;
