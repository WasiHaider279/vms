import React from "react";
import Table from "../global/Table";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "Email", accessor: "email" },
];

const data = [
  { name: "John Doe", age: 30, email: "john.doe@example.com" },
  { name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
];

function StaffAndPermissions() {
  return (
    <>
      <Table
        columns={columns}
        data={data}
        checkbox={false}
        pagination={false}
      />
    </>
  );
}

export default StaffAndPermissions;
