"use client";
import React, { useState } from "react";

const tableHeaders = [
  "Name",
  "ID",
  "Price",
  "Description",
  "Range",
  "Weight",
  "Price",
  "Distance",
];

const ordersData = [
  {
    name: "John Doe",
    id: 1,
    rates: {
      price: 100,
      description: "Fast delivery",
      range: "Local",
      type: {
        weight: "1kg",
        price: 100,
        distance: "10km",
      },
    },
  },
  {
    name: "Fahad Kazmi",
    id: 4,
    rates: {
      price: 100,
      description: "Fast delivery",
      range: "Local",
      type: {
        weight: "1kg",
        price: 100,
        distance: "10km",
      },
    },
  },
  {
    name: "naveed",
    id: 2,
    rates: {
      price: 100,
      description: "Fast delivery",
      range: "Local",
      type: {
        weight: "1kg",
        price: 100,
        distance: "10km",
      },
    },
  },
  {
    name: "Muzamil",
    id: 3,
    rates: {
      price: 100,
      description: "Fast delivery",
      range: "Local",
      type: {
        weight: "1kg",
        price: 100,
        distance: "10km",
      },
    },
  },
];

const OrdersTable = () => {
  const [filters, setFilters] = useState({
    name: "",
    id: "",
    price: "",
    description: "",
    range: "",
    weight: "",
    distance: "",
  });

  const filteredOrders = ordersData.filter((order) => {
    return (
      (filters.name === "" || order.name.includes(filters.name)) &&
      (filters.id === "" || order.id.toString().includes(filters.id)) &&
      (filters.price === "" ||
        order.rates.price.toString().includes(filters.price)) &&
      (filters.description === "" ||
        order.rates.description.includes(filters.description)) &&
      (filters.range === "" || order.rates.range.includes(filters.range)) &&
      (filters.weight === "" ||
        order.rates.type.weight.includes(filters.weight)) &&
      (filters.distance === "" ||
        order.rates.type.distance.includes(filters.distance))
    );
  });

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shipping details</h1>

      <div className="flex flex-wrap mb-4">
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              ID:
            </label>
            <input
              type="text"
              name="id"
              value={filters.id}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={filters.description}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Range:
            </label>
            <input
              type="text"
              name="range"
              value={filters.range}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Weight:
            </label>
            <input
              type="text"
              name="weight"
              value={filters.weight}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Distance:
            </label>
            <input
              type="text"
              name="distance"
              value={filters.distance}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm leading-5 text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="py-2 px-4 border-b border-gray-300">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render table rows */}

            {ordersData.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.rates.price}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.rates.description}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.rates.range}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.rates.type.weight}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.rates.type.price}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.rates.type.distance}
                </td>
              </tr>
            ))}
            {/* {filteredOrders.map((order) => (
    <tr key={order.orderId}>
        <td className="py-2 px-4 border-b border-gray-300">{order.id}</td>
        <td className="py-2 px-4 border-b border-gray-300">{order.price}</td>
        <td className="py-2 px-4 border-b border-gray-300">{order.description}</td>
        <td className="py-2 px-4 border-b border-gray-300">{order.range}</td>
        <td className="py-2 px-4 border-b border-gray-300">{order.weight}</td>
        <td className="py-2 px-4 border-b border-gray-300">{order.distance}</td>
    </tr>
))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
