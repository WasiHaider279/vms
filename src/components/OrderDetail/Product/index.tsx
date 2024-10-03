import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useUpdateOrderStatusMutation } from "@/redux/services/ordersApi";
import { confirmation, failure, success } from "@/utils/notifications";
import CurrentStatus from "@/components/global/CurrentStatus";

const Product = ({ orderData }: any) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [productDetails, setProductDetails] = useState("");
  const [selectAllText, setSelectAllText] =
    useState<string>("Select All Items");

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleSelectAll = () => {
    const allItemIds = orderData?.lineitems?.map((item: any) => item._id) || [];

    const isAllSelected = allItemIds.every((itemId: any) =>
      selectedItems.includes(itemId)
    );
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allItemIds);
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    const selectedItemIndex = selectedItems.indexOf(itemId);
    if (selectedItemIndex === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(selectedItemIndex, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };

  useEffect(() => {
    const allItemIds = orderData?.lineitems?.map((item: any) => item._id) || [];
    const isAllSelected = allItemIds.every((itemId: any) =>
      selectedItems.includes(itemId)
    );
    setSelectAllText(isAllSelected ? "Remove All Items" : "Select All Items");
  }, [selectedItems, orderData]);

  const handleChangeStatus = (status: string) => {
    confirmation("update status", "Confirm").then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus({ itemsIndex: selectedItems, status })
          .unwrap()
          .then((res) => success(res?.data?.message))
          .catch((err) => failure(err?.data?.message || "Server Error"));
      }
    });
  };

  const showButton = orderData?.lineitems?.some(
    (item: any) => item.fulfilmentStatus === "Unfulfilled"
  );

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-3 mt-4 border bg-[#F9FAFB] p-4 rounded-md">
          <h1 className=" text-gray-500 text-sm font-medium font-['Inter'] leading-none">
            Location
          </h1>
          <div className=" text-gray-500 text-sm border-b-2 pb-2 font-medium font-['Inter'] mt-2">
            {orderData?.address?.shipping?.address}
          </div>
          {showButton && (
            <div className="flex gap-2 items-center">
              <button
                onClick={handleSelectAll}
                className="text-blue-600 text-sm font-semibold font-['Inter'] underline"
              >
                {selectAllText === "Select All Items"
                  ? "Select All"
                  : "Remove All"}
              </button>
              <span className="text-gray-400 text-sm font-semibold font-['Inter'] ">
                Select Items {selectedItems.length}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {orderData?.lineitems?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-2 justify-between">
                  <div className="flex gap-6 text-gray-400">
                    <div className="flex flex-col gap-2 text-sm">
                      <p>Payment Status:</p>
                      <CurrentStatus type={item?.paymentStatus} />
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <p>Fulfillment Status:</p>
                      <CurrentStatus type={item?.fulfilmentStatus} />
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <p>Delivery Status:</p>
                      <CurrentStatus type={item?.deliveryStatus} />
                    </div>
                  </div>
                  <div className="flex border-b-2 border-t-2 py-2 flex-wrap gap-2 justify-between ">
                    <div className="flex items-center gap-4">
                      {item?.fulfilmentStatus === "Fulfilled" ||
                      item?.fulfilmentStatus === "Cancelled" ? (
                        <></>
                      ) : (
                        <input
                          type="checkbox"
                          value={item?._id}
                          checked={selectedItems.includes(item?._id)}
                          onChange={() => handleCheckboxChange(item?._id)}
                        />
                      )}
                      <div>
                        <img
                          className="h-14 w-14 border rounded-md bg-gray-300"
                          src={item?.media}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="cursor-pointer text-sm">{item?.name}</p>
                        <p className="bg-gray-200 rounded-lg px-2 py-0.5 w-fit text-xs">
                          {item?.variantName}
                        </p>
                        <p className="text-xs text-gray-500 pl-1">
                          SKU: {item?.sku}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[15px]">
                      <p>
                        Rs {item?.amount} x <span> {item?.qty} </span>
                      </p>
                      <p>Rs {item?.totals?.subTotal}</p>
                      {productDetails ? (
                        <FaAngleUp
                          className="cursor-pointer"
                          onClick={() => {
                            setProductDetails("");
                          }}
                        />
                      ) : (
                        <FaAngleDown
                          className="cursor-pointer"
                          onClick={() => {
                            setProductDetails("detail" + index);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {productDetails === "detail" + index && (
                  <div className="flex flex-col mt-2">
                    <div className=" border-gray-300 text-xs pt-2 flex justify-between">
                      <div className="flex flex-col gap-2">
                        <p>
                          Variant:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {item?.variantName}
                          </span>
                        </p>
                        <p>
                          Weight:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {item?.weight}
                          </span>
                        </p>
                        <p>
                          Bar-code:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {item?.barcode}
                          </span>
                        </p>
                        <p>
                          Shipping Method:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {orderData?.shippingMethod?.type}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>
                          Type:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {item?.type}
                          </span>
                        </p>
                        <p>
                          Category:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {item?.category}
                          </span>
                        </p>
                        <p>
                          Dimensions:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            {item?.dimensions?.length} x{" "}
                            {item?.dimensions?.height} x{" "}
                            {item?.dimensions?.width}
                          </span>
                        </p>
                        <p>
                          Custom Tax:{" "}
                          <span className="pl-4 text-blue-600  font-medium font-['Inter'] leading-none">
                            Rs. {item?.totals?.tax}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {selectedItems.length > 0 && showButton && (
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={(e) => handleChangeStatus("Cancelled")}
              >
                Cancel Order
              </button>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={(e) => handleChangeStatus("Fulfilled")}
              >
                Fulfill Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
