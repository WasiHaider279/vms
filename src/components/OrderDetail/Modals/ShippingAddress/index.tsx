import React from "react";
import PhoneInput from "react-phone-input-2";

type Props = {
  setOpen: Function;
};

const ShippingAddress = (props: Props) => {
  const { setOpen } = props;

  return (
    <>
      <div className="p-4">
        <form className="space-y-2">
          <div className="w-full">
            <h2 className=" font-semibold">Customer Details</h2>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 my-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  required
                  className="mt-1 p-1 border rounded-lg w-full "
                />
              </div>
            </div>
            <div className="w-full my-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-1 border rounded-lg w-full"
              />
            </div>
            <div className="w-full ">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <PhoneInput
                inputProps={{
                  name: "phone",
                  id: "phone",
                  required: true,
                  className: " p- border rounded-lg w-full ",
                }}
                country={"pk"}
                inputClass="input-field"
              />
            </div>
            <hr className="border mt-6"></hr>
          </div>

          <div className="w-full">
            <h2 className="pt-2 font-semibold">Shipping Details</h2>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 my-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  required
                  className="mt-1 p-1  border rounded-lg w-full "
                />
              </div>
            </div>
            <div className="w-full my-3">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                Country / Region:
              </label>
              <select
                id="from"
                name="from"
                className="mt-1 p-1 border rounded-lg w-full"
              >
                <option value="pakistan">Pakistan</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 p-1 border rounded-lg w-full"
              />
            </div>
            <hr className="border mt-6"></hr>
          </div>
          <div className="w-full">
            <h2 className="pt-2 font-semibold">Billing Details</h2>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 my-3">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="mt-1 p-1 border rounded-lg w-full"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  required
                  className="mt-1 p-1  border rounded-lg w-full "
                />
              </div>
            </div>
            <div className="w-full my-3">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                Country / Region:
              </label>
              <select
                id="from"
                name="from"
                className="mt-1 p-1 border rounded-lg w-full"
              >
                <option value="pakistan">Pakistan</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 p-1 border rounded-lg w-full"
              />
            </div>
            <hr className="border mt-6"></hr>
          </div>

          <div>
            <div className="flex justify-end gap-6 mt-4">
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

export default ShippingAddress;
