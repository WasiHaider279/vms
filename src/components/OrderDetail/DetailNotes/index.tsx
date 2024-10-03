import { FaRegCreditCard } from "react-icons/fa";

const DetailNotes = ({ orderData }: any) => {
  return (
    <>
      <div className="w-full">
        <div className="w-full border-b-2 py-2">
          <h5 className="font-semibold text-xl ">Order Details</h5>
        </div>
        <div className="w-full mt-4">
          <h5 className="text-gray-400 text-md font-medium font-['Inter'] uppercase leading-[18px]">
            Total Price
          </h5>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="self-stretch text-blue-600 text-lg font-bold font-['Inter'] leading-normal">
                Rs. {orderData?.totals?.subTotal}
              </div>
              <div className="self-stretch text-gray-400 text-xs font-medium font-['Inter'] leading-[15px]">
                Order Value
              </div>
            </div>

            <div className="flex flex-col">
              <div className=" flex items-center  self-stretch text-blue-600 text-lg font-bold font-['Inter'] leading-normal">
                <span className="pr-4">
                  {" "}
                  <FaRegCreditCard />
                </span>
                Rs. {orderData?.totals?.total}
              </div>
              <div className="self-stretch text-right text-gray-400 text-xs font-medium font-['Inter'] leading-[15px]">
                Balance
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start  gap-4 mt-2 text-gray-400 text-sm font-medium font-['Inter']">
            <div>
              <p>Sub Total</p>
              <p>Sales Tax</p>
              <p>Promo Discount</p>
              <p>Shipping</p>
            </div>
            <div className="text-right">
              <p>Rs. {orderData?.totals?.subTotal}</p>
              <p>Rs. {orderData?.totals?.tax}</p>
              <p>Rs. {orderData?.totals?.discount}</p>
              <p>Rs. {orderData?.totals?.shipping}</p>
              <p className="text-left self-stretch mt-2 text-gray-400 text-base font-medium font-['Inter']">
                Total Amount
              </p>
              <p className="self-stretch text-blue-600 text-lg font-bold font-['Inter'] ">
                Rs. {orderData?.totals?.total}
              </p>
            </div>
          </div>
          <div>
            <div className="self-stretch text-gray-400 text-sm font-medium font-['Inter'] ">
              Notes:
            </div>
            <p>{orderData?.orderDetails?.notes}</p>
          </div>
          <div className="rounded-lg  bg-[#F9FAFB] mt-4 text-sm">
            <h3 className=" text-black  font-semibold font-['Inter'] leading-none">
              Contact Information
            </h3>
            <p className="text-gray-500 text-sm font-medium font-['Inter'] ">
              {orderData?.contactInfo?.email}
            </p>
            <p className=" text-gray-500  font-medium font-['Inter'] ">
              {orderData?.contactInfo?.phone}
            </p>
            <p className="mt-4 text-black text-sm font-semibold font-['Inter'] ">
              Shipping Address
            </p>
            <div className="w-[269.94px] text-gray-500 font-medium font-['Inter'] ">
              {orderData?.address?.shipping?.address}
              <br />
              {orderData?.address?.shipping?.city}
              <br />
              {orderData?.address?.shipping?.country}
            </div>
            <p className="mt-4 text-black text-sm font-semibold font-['Inter'] ">
              Billing Address
            </p>
            <div className="w-[269.94px] text-gray-500 font-medium font-['Inter'] ">
              {orderData?.address?.billing?.address}
              <br />
              {orderData?.address?.billing?.city}
              <br />
              {orderData?.address?.billing?.country}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailNotes;
