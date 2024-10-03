const DeliveryDetails = ({ orderData }: any) => {
  return (
    <>
      <div className="w-full ">
        <div className="border-b">
          <p className="flex rounded-lg py-2 px-2 text-xl w-fit">
            Delivery Details
          </p>
        </div>
        <div className=" bg-[#F9FAFB] flex-wrap mt-4 border justify-between rounded-md p-4 text-sm">
          <p className=" text-gray-500 text-sm font-semibold font-['Inter'] leading-none">
            Rider
          </p>
          <p className="whitespace-nowrap text-gray-500 text-sm my-2 font-medium font-['Inter'] leading-none">
            {orderData?.lineitems[0]?.assignedRider?.name}
          </p>

          <hr className="text-black w-full  border" />

          <p className=" text-gray-500 text-sm font-semibold font-['Inter'] mt-2 leading-none">
            Delivery Method
          </p>

          <div className="flex  w-full gap-2 md:gap-10 mt-4">
            <div className="w-1/4">
              <p className="whitespace-nowrap text-gray-500 text-sm my-2 font-medium font-['Inter'] leading-none">
                Tracking ID: 110213
              </p>
            </div>
            <div className=" w-3/4">
              <p className="w-full text-end">
                {orderData?.shippingMethod?.type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeliveryDetails;
