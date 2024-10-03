import React from "react";
import { useState } from "react";

type Props = {
  setOpen: Function;
};

const SendInvoice = (props: Props) => {
  const [showCcBcc, setShowCcBcc] = useState(false);

  const toggleCcBcc = () => {
    setShowCcBcc(!showCcBcc);
  };

  return (
    <>
      <div className="p-4">
        <form className="space-y-2">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700"
              >
                To:
              </label>
              <input
                type="email"
                id="to"
                name="to"
                required
                className="mt-1 p-1 border rounded-lg w-full"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                From:
              </label>
              <select
                id="from"
                name="from"
                className="mt-1 p-1 border rounded-lg w-full"
              >
                <option value="ismmartindustries@gmail.com">ISMMART</option>
                <option value="developers786@gmail.com">ISMMART</option>
                <option value="naveedaziz717@gmail.com">Naveed Aziz</option>
              </select>
            </div>
          </div>
          <div
            className={`flex space-x-4 items-center cursor-pointer ${
              showCcBcc ? "text-blue-400" : "text-blue-600"
            }`}
            onClick={toggleCcBcc}
          >
            <span>Cc and Bcc recipients ↓</span>
          </div>
          {showCcBcc && (
            <div>
              <label
                htmlFor="Cc"
                className="block text-sm font-medium text-gray-700"
              >
                Cc
              </label>
              <input
                type="email"
                id="cc"
                name="cc"
                className="mt-1 p-1 border rounded-lg w-full"
              />
              <div className="flex flex-col mt-4">
                <label>Bcc</label>
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="bcc"
                    value="1.tauheedbutt@gmail.com"
                  />
                  <span className="ml-2">tauheedbutt@gmail.com</span>
                </label>
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="bcc"
                    value="2.ismmartindustries@gmail.com"
                  />
                  <span className="ml-2">ismmartindustries@gmail.com</span>
                </label>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter subject"
              className="mt-1 p-1 border rounded-lg w-full"
            />
          </div>
          <div>
            <label
              htmlFor="customMessage"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Message (optional):
            </label>
            <textarea
              id="customMessage"
              name="customMessage"
              rows={2}
              placeholder="Enter custom message"
              className="mt-1 p-2 border rounded-lg w-full"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="p-2 text-sm  bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="button"
              className="p-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Review Invoice
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SendInvoice;
