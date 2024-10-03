"use client";
import React from "react";
import Table from "@/components/global/Table";
import Link from "next/link";
import { columns, data } from "@/utils/data";

const CollectionListing = () => {
  return (
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
  );
};

export default CollectionListing;
