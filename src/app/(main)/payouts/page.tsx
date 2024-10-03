"use client";
import React, { useState } from "react";
import Table from "@/components/global/Table";
import { IPayout } from "@/types/payoutsTypes";
import { columns, data } from "@/utils/data";

const PayoutsListingPage: React.FC = () => {
  const payouts: IPayout[] = [
    {
      id: 1,
      requestedDate: "2021-09-01",
      amount: 100,
      bankName: "Bank of America",
      transferMethod: "ACH",
      status: "pending",
    },
  ];

  const tableHeaders: string[] = [
    "Requested Date",
    "Amount",
    "Bank Name",
    "Transfer Method",
    "Status",
    "Action",
  ];

  // Fetch payouts data from API or database
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/payouts');
  //     const data = await response.json();
  //     setPayouts(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Payouts Listing</h1>
      {/* <Table tableHeadings={tableHeaders}>
        {payouts.map((payout) => (
          <tr key={payout.id}>
            <td>{payout.requestedDate}</td>
            <td>{payout.amount}</td>
            <td>{payout.bankName}</td>
            <td>{payout.transferMethod}</td>
            <td>
              <select value={payout.status}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </td>
            <td>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </Table> */}
      <Table
        filters={[
          // Example text input
          {
            type: "date",
            placeholder: "Enter a name",
          },
          // Example text input
          {
            type: "select",
            // options: ["active", "pending", "cancelled"],
            placeholder: "Enter a name",
          },
          {
            type: "text",
            placeholder: " amount",
          },
        ]}
        checkbox={false}
        columns={columns}
        data={data}
        pagination={true}
        isFetching={false}
      />
    </div>
  );
};

export default PayoutsListingPage;
