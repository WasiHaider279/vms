import React from "react";

type Props = {
  setOpen: Function;
};

const ContactInformation = (props: Props) => {
  const { setOpen } = props;
  return (
    <>
      <div className="p-4">
        <form className="space-y-2">
          <div className="w-full mb-4">
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
          <div className="w-full mb-4">
            <label
              htmlFor="phone-number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="number"
              id="phone-number"
              name="phone-number"
              required
              className="mt-1 p-1 border rounded-lg w-full mb-4"
            />
          </div>
          <div>
            <hr className="border"></hr>
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

export default ContactInformation;
