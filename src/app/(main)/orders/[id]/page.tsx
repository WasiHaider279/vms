"use client";
import "react-phone-input-2/lib/style.css";
import { useParams } from "next/navigation";
import Box from "@/components/global/Box";
import Product from "@/components/OrderDetail/Product";

import DetailNotes from "@/components/OrderDetail/DetailNotes";
import DeliveryDetails from "@/components/OrderDetail/Modals/DeliveryDetails/DeliveryDetails";
import TimeLine from "@/components/OrderDetail/TimeLine";
import { useGetOrdersQuery } from "@/redux/services/ordersApi";
import Loader from "@/components/global/Loader";
import CurrentStatus from "@/components/global/CurrentStatus";

const OrderDetailPage = () => {
  const params: any = useParams();

  const { data, isFetching } = useGetOrdersQuery({
    id: params?.id,
  });

  const orderData = data?.data?.items[0];

  return (
    <section className="flex flex-col gap-8 mx-auto">
      {!isFetching ? (
        <>
          <div className="flex justify-between  items-center">
            <div className="flex gap-8 items-center">
              <h1 className=" text-black text-4xl font-bold font-['Inter'] leading-[27.08px]">
                {orderData?.orderId}
              </h1>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 text-sm">
                  <p>Payment Status:</p>
                  <CurrentStatus type={orderData?.paymentStatus} />
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <p>Fulfillment Status:</p>
                  <CurrentStatus type={orderData?.fulfilmentStatus} />
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <p>Delivery Status:</p>
                  <CurrentStatus type={orderData?.deliveryStatus} />
                </div>
              </div>
            </div>
          </div>
          <div className=" text-gray-400 text-base font-medium font-['Inter'] leading-[27.08px]">
            {new Date(orderData?.createdAt).toDateString()} at{" "}
            {orderData?.orderDetails?.market}
          </div>
          <div className="flex gap-4 flex-col md:flex-row justify-between flex-wrap items-start">
            <div className="flex-[2] w-full flex flex-col gap-4 ">
              <Box className=" p-4 flex flex-col gap-2">
                <Product orderData={orderData} />
              </Box>

              <Box className="p-4 flex flex-col gap-2">
                <DeliveryDetails orderData={orderData} />
              </Box>
            </div>
            <div className="flex-1 w-full flex flex-col gap-4 ">
              <Box className="p-4">
                <DetailNotes orderData={orderData} />
              </Box>
              <Box className={"mb-10 p-4 flex flex-col gap-4"}>
                <TimeLine orderData={orderData} />
              </Box>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default OrderDetailPage;
