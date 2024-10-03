"use client";
import Table from "@/components/global/Table";
import { useQueryString } from "@/hooks/useQueryString";
import { useGetOrdersQuery } from "@/redux/services/ordersApi";
import { orderColumns } from "@/utils/data";
import React from "react";

const OrdersTable = () => {
  const queryString = useQueryString();
  const { data: orderData, isFetching } = useGetOrdersQuery(
    queryString.getAll()
  );

  const handleOrderStatus = (value: string) => {
    queryString.set({ name: "fulfilmentStatus", value });
  };
  const { fulfilmentStatus } = queryString.getAll();
  console.log(fulfilmentStatus, "abc");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 animate__animated animate__fadeInRightBig">
        Orders
      </h1>
      <div className="text-sm mb-4 font-medium text-center text-gray-500   dark:text-gray-400">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2 cursor-pointer">
            <p
              className={`${
                !fulfilmentStatus
                  ? "active text-blue-600 border-b-2 border-blue-600 rounded-t-lg"
                  : "hover:text-gray-600 hover:border-gray-300"
              } inline-block p-4   `}
              aria-current="page"
              onClick={() => handleOrderStatus("")}
            >
              All
            </p>
          </li>
          <li
            onClick={() => handleOrderStatus("Returned")}
            className="me-2 cursor-pointer "
          >
            <p
              className={`${
                fulfilmentStatus == "Returned"
                  ? "active text-blue-600 border-b-2 border-blue-600 rounded-t-lg"
                  : "hover:text-gray-600 hover:border-gray-300"
              } inline-block p-4   `}
              aria-current="page"
            >
              Returned
            </p>
          </li>
          <li onClick={() => handleOrderStatus("Cancelled")} className="me-2">
            <p
              className={`${
                fulfilmentStatus === "Cancelled"
                  ? "active text-blue-600 border-b-2 border-blue-600 rounded-t-lg"
                  : "hover:text-gray-600 hover:border-gray-300"
              } inline-block p-4   `}
              aria-current="page"
            >
              Cancelled
            </p>
          </li>
        </ul>
      </div>

      <Table
        filters={[
          {
            type: "select",
            name: "sort[createdAt]",
            label: "Created At",
            options: [
              { name: "Ascending", value: "1" },
              { name: "Descending", value: "-1" },
            ],
          },
          {
            type: "select",
            name: "paymentStatus",
            label: "Payment Status",
            options: [
              { name: "Pending" },
              { name: "Authorized" },
              { name: "Overdue" },
              { name: "Expiring" },
              { name: "Expired" },
              { name: "Paid" },
              { name: "Refunded" },
              { name: "Partially refunded" },
              { name: "Partially paid" },
              { name: "Voided" },
              { name: "Unpaid" },
            ],
          },
          {
            type: "select",
            name: "fulfilmentStatus",
            label: "Fulfillment status",
            defaultValue: "Fulfillment Status",
            options: [
              { name: "Unfulfilled" },
              { name: "Fulfilled" },
              { name: "Partially fulfilled" },
              { name: "Scheduled" },
              { name: "Returned" },
              { name: "Cancelled" },
              { name: "On hold" },
            ],
          },
          {
            type: "select",
            name: "deliveryStatus",
            label: "Delivery Status",
            options: [
              { name: "Pending" },
              { name: "Ready to transit" },
              { name: "Pickup" },
              { name: "On way" },
              { name: "Delivered" },
            ],
          },

          {
            type: "text",
            name: "text",
            label: "Payment Status",
            placeholder: "Search by order ID",
          },
        ]}
        checkbox={false}
        columns={orderColumns}
        data={orderData?.data?.items}
        pagination={true}
        isFetching={isFetching}
        payload={{
          page: orderData?.data?.page,
          limit: orderData?.data?.limit,
          total: orderData?.data?.total,
          pages: orderData?.data?.pages,
        }}
        actions={[{ type: "edit", url: "/orders" }]}
      />
    </div>
  );
};

export default OrdersTable;
