import React, { ReactNode, useState } from "react";

type Props = {
  title: any;
  options: { name: string; value?: string }[];
  onChange: Function;
};

const DropdownButton = (props: Props) => {
  const { title, options, onChange } = props;
  const [dropdown, setDropdown] = useState("");
  return (
    <div className="relative z-30 inline-block text-left">
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.scroll({
              top: document.body.scrollHeight,
              behavior: "smooth", // Optional: Add smooth scrolling effect
            });
            if (dropdown) {
              setDropdown("");
            } else {
              setDropdown(title);
            }
          }}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
        >
          <svg
            className=" h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      {dropdown == title && (
        <div className="origin-top-right absolute right-0 z-50 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option.value ? option?.value : option.name);
                  setDropdown("");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
