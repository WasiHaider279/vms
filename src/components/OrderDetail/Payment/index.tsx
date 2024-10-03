import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useState } from "react";
import Container from "@/components/global/Container";

type Props = {
  openFunction: Function;
};

const Payment = (props: Props) => {
  const { openFunction } = props;
  const [paymentTerm, setPaymentTerm] = useState("");

  return (
    <>
      <div className="w-full">
        <div>
          <p className="flex bg-[#Ffa970] rounded-lg py-2 px-2 text-sm w-fit">
            <AiOutlineClockCircle className="mt-1 mr-2 text-[#412D00]" />
            Pending ({1})
          </p>
        </div>
        <div className="flex flex-wrap mt-4 border justify-between rounded-md p-4 text-sm">
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-10">
            <div className="w-1/4 ">
              <p>Subtotal</p>
            </div>
            <div className="flex justify-between w-3/4 ">
              <p>1 item</p>
              <p>Rs 6,690.00</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-10 mt-4">
            <div className="w-1/4">
              <p>Tax</p>
            </div>
            <div className="flex  justify-between w-3/4">
              <p>GST 16%</p>
              <p className="ml-4">Rs 1,070.40</p>
            </div>
          </div>
          <div className="flex  w-full gap-2 md:gap-10 mt-4">
            <div className="w-1/4">
              <p>Total</p>
            </div>
            <div className="w-3/4">
              <p className="w-full text-end">Rs 7,760.40</p>
            </div>
          </div>
          <hr className="text-black w-full m-4 border" />
          <div className="flex  w-full gap-2 md:gap-10 mt-4">
            <div className="w-1/4">
              <p>Paid by customer</p>
            </div>
            <div className=" w-3/4">
              <p className="w-full text-end">Rs 0.00</p>
            </div>
          </div>
          <div className="flex  w-full gap-2 md:gap-10 mt-4 ">
            <div className="w-3/4">
              <p>
                Payment due on September 14, 2023 (Net 7){" "}
                <span className="bg-pink-200 text-pink-800 rounded-md p-1">
                  Overdue
                </span>
              </p>
            </div>
            <div className="flex justify-end w-1/4">
              <button
                onClick={() => openFunction("Edit payment terms")}
                className="text-sm text-blue-600"
              >
                {paymentTerm === "" ? "Add payment term" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;
