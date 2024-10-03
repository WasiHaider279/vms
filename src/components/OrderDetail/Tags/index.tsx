import React from "react";
import { FaPen } from "react-icons/fa";

type Props = {
  openFunction: Function;
};

const Tags = (props: Props) => {
  const { openFunction } = props;

  return (
    <>
      <div className="w-full">
        <div className="flex gap-4 items-center justify-between">
          <h5 className="font-bold text-sm">Tags</h5>
          <FaPen
            onClick={() => openFunction("manage tags")}
            className="w-4 cursor-pointer font-bold"
          />
        </div>
        <div className="mt-2">
          <div className="relative">
            <input
              type="text"
              name="search"
              id="sidebar-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Tags;
