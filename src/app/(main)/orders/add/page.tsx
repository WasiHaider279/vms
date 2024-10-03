"use client";
import Container from "@/components/global/Container";
import React, { useState } from "react";
import Modal from "@/components/global/Modal";
import { ordersData, tableHeaders } from "@/utils/add-order";
import PhoneInput from "react-phone-input-2";
import CustomerPopup from "@/components/AddOrder/CustomerPopup";
import ProductsModal from "@/components/AddOrder/ProductsModal";
import { useRouter } from "next/navigation";

function Dashboard() {
  const [selectedProducts, setSelectedProducts] = useState<object>();
  const router = useRouter();
  const [requested, setCustomerPayload] = useState<object>();
  const [open, setOpen] = useState(false);
  const [productsModal, setProductsModal] = useState(false);

  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        <Container title="Add Customer" className="rounded-lg">
          <CustomerPopup
            setOpen={setOpen}
            getData={(data: object) => {
              setCustomerPayload(data);
            }}
          />
        </Container>
      </Modal>
      <Modal open={productsModal} setOpen={setProductsModal}>
        <Container title="Select Products" className="rounded-lg">
          <ProductsModal
            getSelectedProducts={(data: object) => {
              setSelectedProducts(data);
            }}
          />
        </Container>
      </Modal>
      <button
        type="button"
        onClick={() => {
          router.push(`/refund`);
        }}
        className="text-white float-right  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Refund
      </button>
      <Container title="Create Order">
        <div></div>
        <div className="rounded-lg w-full ">
          <div className="flex justify-between w-full">
            <p>Products List</p>
            <div className="flex gap-4">
              <p>Reserve Items</p>
              <p>Add custom item</p>
            </div>
          </div>
          {/* Search form */}
          <div className="flex items-center mt-10">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search products..."
              />
            </div>
            <button
              onClick={() => {
                setProductsModal(!productsModal);
              }}
              type="button"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>Browse</span>
            </button>
          </div>
          {/* End Search */}
          <div className="overflow-x-auto mt-10">
            <table className="w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="py-2 px-4 border-b border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Render table rows */}
                {ordersData.map((order) => (
                  <tr key={order.orderId}>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.orderId}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.customerName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.date}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.paymentStatus}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.fulfillmentStatus}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.deliveryStatus}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.deliveryMethod}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.channel}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.market}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.numOfProducts}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {order.amount}
                    </td>
                    <td className="py-2 px-4 border-b cursor-pointer text-red-500 border-gray-300">
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
      <Container className="mt-10" title="Payment">
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className="cursor-pointer"
        >
          Customer +
        </div>
        <div className="rounded-lg w-full ">
          <div className="flex justify-between w-full">
            <p className="font-bold">Products</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Subtotal</p>
              <p>Add discount</p>
              <p>Add shipping</p>
              <p>Estimated Tax</p>
            </div>
            <div>
              <p>4800</p>
              <p>0.00</p>
              <p>0.00</p>
              <p>768</p>
              <p>5568</p>
            </div>
          </div>
        </div>
      </Container>

      <button
        type="button"
        className="text-white mt-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Create Order
      </button>
    </div>
  );
}

export default Dashboard;
