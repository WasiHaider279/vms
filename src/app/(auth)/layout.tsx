import "animate.css";
import { Providers } from "@/redux/provider";
import "../../styles/global.css";
import Notification from "@/components/global/Notification";
import type { Metadata } from "next";
import Link from "next/link";
import AuthHeader from "@/components/auth/AuthHeader";

export const metadata: Metadata = {
  title: "Vendor Management System",
  description: "Vendor Management System",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col relative"
        suppressHydrationWarning={true}
      >
        <Providers>
          {" "}
          {/* topbar */}
          <AuthHeader />
          <div
            className=" w-full h-[950px] bg-cover"
            style={{
              backgroundImage: "url('/assets/images/siginbg.png')",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-row justify-between">
              <div className="pt-[106px] pl-[126px] text-white text-6xl font-bold font-['Inter'] leading-[72.60px]">
                Sell Your Products
                <br />
                On Pakistan’s
                <br />
                Best Store
              </div>
              {children}{" "}
            </div>
          </div>
          {/* second section */}
          <div className="bg-[url('/assets/images/footer.svg')] w-full h-[550px] bg-no-repeat bg-contain ">
            <div className="GetYourDailyNeedsOurIsmmartStore w-[628px] ml-[120px] pt-[60px] ">
              <span className="text-neutral-900 text-4xl font-bold font-['Inter'] leading-[54px]">
                Get Your Daily Needs
              </span>
              <span className="text-sky-500 text-4xl font-bold font-['Inter'] leading-[54px]">
                {" "}
                <br />
                Our ISMMART
              </span>
              <span className="text-neutral-900 text-4xl font-bold font-['Inter'] leading-[54px]">
                {" "}
                Store{" "}
              </span>
              <p className="ThereAreManyProductsYouWillFindAtOurShopChooseYourDailyNecessaryProductsFromOurIsmmartShopAndGetSomeSpecialOffers w-[628px] text-slate-700 text-md font-light font-['Inter'] leading-[21px] mt-4">
                There are many products you will find at our shop, Choose your
                daily necessary products from our ISMMART shop and get some
                special offers.
              </p>
              <p className="GetTheApp text-zinc-900 text-lg font-medium font-['Inter'] leading-7 mt-4">
                Get the App
              </p>

              <div className="flex flex-row gap-2">
                <button>
                  {" "}
                  <img src="/assets/images/Layer 2.svg" alt="image" />
                </button>
                <button>
                  {" "}
                  <img src="/assets/images/appstore.svg" alt="image" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-around mb-14 mt-6">
            <div className="flex flex-row gap-2">
              <img
                className="w-10 h-10"
                src="/assets/images/truck.svg"
                alt="image"
              />{" "}
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                Free Shipping
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <img
                className="w-10 h-10"
                src="/assets/images/phone.svg"
                alt="image"
              />
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                24/7 Support
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <img
                className="w-10 h-10"
                src="/assets/images/batwa.svg"
                alt="image"
              />
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                Secure payment
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <img
                className="w-10 h-10"
                src="/assets/images/card.svg"
                alt="image"
              />
              <div className="FreeShipping w-[258px] text-neutral-900 text-base font-normal font-['Inter'] capitalize">
                20 % Discount Week
              </div>
            </div>
          </div>
          {/* foooter */}
          <div className="absolute bottom-0 text-white bg-black w-full z-40 p-2 text-center">
            © Copyright 2024 ismmart.com - All Rights Reserved.
          </div>
          <Notification />
        </Providers>
      </body>
    </html>
  );
}
