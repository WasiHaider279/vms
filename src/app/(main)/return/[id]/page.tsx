"use client";
import { FaXmark } from "react-icons/fa6";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/global/Layout/Header";
import Box from "@/components/global/Box";
import CustomerInfo from "@/components/OrderDetail/TimeLine";
import Modal from "@/components/global/Modal";
import Product from "@/components/OrderDetail/Product";
import Payment from "@/components/OrderDetail/Payment";
import Tags from "@/components/OrderDetail/Tags";
import DetailNotes from "@/components/OrderDetail/DetailNotes";
import SendInvoice from "@/components/OrderDetail/Modals/SendInvoice";
import PaymentTerm from "@/components/OrderDetail/Modals/PaymentTerm";
import AddNote from "@/components/OrderDetail/Modals/AddNote";
import AdditionlDetails from "@/components/OrderDetail/Modals/AdditionalDetails";
import ContactInformation from "@/components/OrderDetail/Modals/ContactInformation";
import ShippingAddress from "@/components/OrderDetail/Modals/ShippingAddress";
import OrderStepper from "@/components/global/OrderStepper";
import { AiOutlineClockCircle } from "react-icons/ai";
import DeliveryDetails from "@/components/OrderDetail/Modals/DeliveryDetails/DeliveryDetails";
import TimeLine from "@/components/OrderDetail/TimeLine";

const modalText = [
  "add note",
  "edit contact information",
  "edit shipping address",
  "manage tags",
  "Send invoice",
  "Edit payment terms",
  "additional details",
];

const OrderDetialPage = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState<string>("");

  const openMode = (text: string) => {
    setOpen(true);
    setModalState(text);
  };
  const params = useParams();
  return (
    <section className="flex flex-col gap-8 mx-auto">
      <div className="flex justify-between  items-center">
        <div className="flex items-center">
          <h1 className=" text-black text-4xl font-bold font-['Inter'] leading-[27.08px]">
            {params.id}
          </h1>
        </div>
        <OrderStepper />
      </div>
      <div className=" text-gray-400 text-base font-medium font-['Inter'] leading-[27.08px]">
        April 23, 2023 at 1:30 pm at Online Store
      </div>
      <div className="flex gap-4 flex-col md:flex-row justify-between flex-wrap items-start">
        <div className="flex-[2] w-full flex flex-col gap-4 ">
          <Box className=" p-4 flex flex-col gap-2">
            <Product />
          </Box>
          {/* <Box className="p-4 flex flex-col gap-2">
            <Payment openFunction={openMode} />
          </Box> */}
          <Box className="p-4 flex flex-col gap-2">
            <DeliveryDetails openFunction={openMode} />
          </Box>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4 ">
          <Box className="p-4">
            <DetailNotes openFunction={openMode} />
          </Box>
          <Box className={" p-4 flex flex-col gap-4"}>
            <TimeLine openFunction={openMode} />
          </Box>
        </div>
      </div>
      {modalText.includes(modalState) && (
        <Modal open={open} setOpen={setOpen}>
          <div className="flex justify-between  gap-4 p-4 bg-gray-200">
            <h5 className="font-semibold text-lg capitalize">{modalState}</h5>
            <FaXmark
              className="w-7 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          {modalState === "Send invoice" && <SendInvoice setOpen={setOpen} />}

          {modalState === "Edit payment terms" && (
            <PaymentTerm setOpen={setOpen} />
          )}

          {modalState === "add note" && <AddNote setOpen={setOpen} />}

          {modalState === "additional details" && (
            <AdditionlDetails setOpen={setOpen} />
          )}

          {modalState === "edit contact information" && (
            <ContactInformation setOpen={setOpen} />
          )}

          {modalState === "edit shipping address" && (
            <ShippingAddress setOpen={setOpen} />
          )}
        </Modal>
      )}
    </section>
  );
};

export default OrderDetialPage;
