import React from "react";

type Props = {
  type: string;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    // Payment Status
    case "Pending":
      return { backgroundColor: "#FFECB3", textColor: "#333" }; // Light Amber
    case "Authorized":
      return { backgroundColor: "#B3E0FF", textColor: "#333" }; // Light Sky Blue
    case "Overdue":
      return { backgroundColor: "#FFCDD2", textColor: "#333" }; // Light Pink
    case "Expiring":
    case "In-Active":
      return { backgroundColor: "#FFCC80", textColor: "#333" }; // Light Orange
    case "Expired":
      return { backgroundColor: "#FFCDD2", textColor: "#333" }; // Light Pink (similar to Expired)
    case "Paid":
    case "Active":
      return { backgroundColor: "#C8E6C9", textColor: "#333" }; // Light Green
    case "Refunded":
      return { backgroundColor: "#D1C4E9", textColor: "#333" }; // Light Purple
    case "Partially refunded":
      return { backgroundColor: "#E1BEE7", textColor: "#333" }; // Light Lavender
    case "Partially paid":
      return { backgroundColor: "#B2DFDB", textColor: "#333" }; // Light Aqua
    case "Voided":
      return { backgroundColor: "#E0E0E0", textColor: "#333" }; // Light Grey
    case "Unpaid":
      return { backgroundColor: "#FFCCBC", textColor: "#333" }; // Light Apricot

    // Order Status
    case "Unfulfilled":
      return { backgroundColor: "#BBDEFB", textColor: "#333" }; // Light Blue
    case "Fulfilled":
      return { backgroundColor: "#C8E6C9", textColor: "#333" }; // Light Green (similar to Paid)
    case "Partially fulfilled":
      return { backgroundColor: "#FFECB3", textColor: "#333" }; // Light Amber (similar to Pending)
    case "Scheduled":
      return { backgroundColor: "#FFE0B2", textColor: "#333" }; // Light Orange (similar to Expiring)
    case "Returned":
      return { backgroundColor: "#E1BEE7", textColor: "#333" }; // Light Lavender (similar to Partially refunded)
    case "Cancelled":
      return { backgroundColor: "#FFAB91", textColor: "#333" }; // Light Salmon
    case "On hold":
      return { backgroundColor: "#E1BEE7", textColor: "#333" }; // Light Lavender (similar to Returned)

    // Connection Status
    case "Online":
      return { backgroundColor: "#C8E6C9", textColor: "#333" }; // Light Green (similar to Paid)
    case "Offline":
      return { backgroundColor: "#FFCDD2", textColor: "#333" }; // Light Pink (similar to Expired)
    case "Other":
      return { backgroundColor: "#F5F5F5", textColor: "#333" }; // White Smoke

    // Shipment Status
    case "Pending":
      return { backgroundColor: "#FFECB3", textColor: "#333" }; // Light Amber (similar to Pending)
    case "Ready to transit":
      return { backgroundColor: "#B3E0FF", textColor: "#333" }; // Light Sky Blue (similar to Authorized)
    case "Pickup":
      return { backgroundColor: "#B2DFDB", textColor: "#333" }; // Light Aqua (similar to Partially paid)
    case "On way":
      return { backgroundColor: "#FFCC80", textColor: "#333" }; // Light Orange (similar to Expiring)
    case "Delivered":
      return { backgroundColor: "#C8E6C9", textColor: "#333" }; // Light Green (similar to Paid)

    default:
      return { backgroundColor: "#F5F5F5", textColor: "#333" }; // White Smoke (default)
  }
};

const CurrentStatus = ({ type }: Props) => {
  const statusStyle = getStatusStyle(type);

  return (
    <div
      className={`px-3 py-1 rounded-md justify-center items-center inline-flex`}
      style={{
        backgroundColor: statusStyle.backgroundColor,
        color: statusStyle.textColor,
        fontSize: "12px",
        fontWeight: "medium",
      }}
    >
      <div className="text-center font-medium font-['Inter'] leading-3">
        {type}
      </div>
    </div>
  );
};

export default CurrentStatus;
