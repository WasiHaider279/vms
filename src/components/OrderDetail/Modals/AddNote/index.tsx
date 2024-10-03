import React from "react";

type Props = {
  setOpen: Function;
};

const AddNote = (props: Props) => {
  const { setOpen } = props;
  return (
    <>
      <div className="p-4">
        <form className="space-y-2">
          <div className="w-full mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <input
              type="text"
              id="notes"
              name="notes"
              required
              className="mt-1 p-1 border rounded-lg w-full"
            />
          </div>
          <p className="text-sm text-gray-700 pb-2">
            To comment on an order or mention a staff member, use{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Timeline{" "}
            </span>
            instead.
          </p>
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

export default AddNote;
