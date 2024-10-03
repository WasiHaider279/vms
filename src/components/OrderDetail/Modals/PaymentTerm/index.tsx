import React from "react";
import { useState } from "react";

type Props = {
  setOpen: Function;
};

const PaymentTerm = (props: Props) => {
  const { setOpen } = props;
  const [paymentDue, setPaymentDue] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [issueDate, setIssueDate] = useState(null);

  const handleSelectChange = (event: any) => {
    const selectedTerm = event.target.value;
    setPaymentTerm(selectedTerm);

    // Check if the selected term is "Due on receipt" or "Due on fulfillment"
    if (selectedTerm === "receipt") {
      setPaymentDue("Payment due when invoice is sent");
      setIssueDate(null); // Clear the issue date
    } else if (selectedTerm === "fulfillment") {
      setPaymentDue("Payment due when order is fulfilled");
      setIssueDate(null); // Clear the issue date
    } else {
      setPaymentDue("");
      if (issueDate != null) {
        calculateDate(issueDate, event.target.value);
      }
    }
  };

  const handleDateChange = (e: any) => {
    setIssueDate(e.target.value);
    calculateDate(e.target.value, paymentTerm);
  };

  const calculateDate = (date: string, days: string) => {
    const selectedDays = parseInt(days);
    const [month, day, year] = date.split("-").map(Number);

    const formattedDate = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year.toString().padStart(2, "0")}`;

    const currentDate = new Date(formattedDate);
    currentDate.setDate(currentDate.getDate() + selectedDays);
    const newMonth = currentDate.getMonth() + 1; // Adding 1 because months are 0-indexed
    const newDay = currentDate.getDate();
    const newYear = String(currentDate.getFullYear()).slice(2); // Getting last 2 digits of the year

    const formattedNextDate = `${newMonth}-${newDay}-${newYear}`;
    setPaymentDue("Payment due on " + formattedNextDate);
  };

  return (
    <>
      {" "}
      <div className="p-4">
        <form className="space-y-2">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="payment-terms"
                className="block text-sm font-medium text-gray-700"
              >
                Payment terms
              </label>
              <select
                id="payment-terms"
                name="payment-terms"
                className="mt-1 p-1 border rounded-lg w-full"
                onChange={handleSelectChange}
                value={paymentTerm}
              >
                <option value=""></option>
                <option value="receipt">Due on receipt</option>
                <option value="fulfillment">Due on fulfillment</option>
                <option value="7days">Within 7 days</option>
                <option value="15days">Within 15 days</option>
                <option value="30days">Within 30 days</option>
                <option value="45days">Within 45 days</option>
                <option value="60days">Within 60 days</option>
                <option value="90days">Within 90 days</option>
              </select>{" "}
            </div>
            {paymentTerm !== "" &&
              paymentTerm !== "receipt" &&
              paymentTerm !== "fulfillment" && (
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="issue-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Issue date
                  </label>
                  <input
                    className="mt-1 p-1 border rounded-lg w-full"
                    type="date"
                    onChange={handleDateChange}
                    value={issueDate || ""}
                  ></input>
                </div>
              )}
          </div>
          <p className="text-sm font-semibold ">{paymentDue}</p>
          <hr className="border "></hr>
          <div className="flex w-full">
            <div className="w-1/2 ">
              {paymentTerm !== "" && (
                <button
                  onClick={() => [
                    setPaymentTerm(""),
                    setPaymentDue(""),
                    setIssueDate(null),
                  ]}
                  className="bg-red-600 text-white rounded-md text-sm py-1 px-3 hover:bg-red-800"
                >
                  Remove Terms
                </button>
              )}
            </div>
            <div className="w-1/2 flex justify-end gap-6">
              <button
                type="button"
                onClick={() => [setOpen(false)]}
                className="rounded-md text-sm shadow-lg px-3 py-1 border"
              >
                Cancel
              </button>
              <button className="bg-gray-500 px-3 py-1 text-white text-sm rounded-md hover:bg-gray-800">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentTerm;
