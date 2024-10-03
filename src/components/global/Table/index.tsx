"use client";
import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import Pagination from "./Pagination";
import Loader from "../Loader";
import { FaEye, FaSearch } from "react-icons/fa";
import CurrentStatus from "../CurrentStatus";
import { useRouter } from "next/navigation";
import { useQueryString } from "@/hooks/useQueryString";
import { FaPencil } from "react-icons/fa6";

interface Column {
  header: string;
  accessor: string | ((data: any) => React.ReactNode);
}

interface MyInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
    "onChange"
  > {
  options?: Array<{ name: string; value?: string | number }>;
  label?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  checkbox?: boolean;
  filters?: Array<MyInputProps>;
  className?: string;
  payload?: {
    limit: number | 0;
    page: number | 0;
    pages: number | 0;
    total: number | 0;
  };
  isFetching?: boolean;
  actions?: Array<{ type?: string; url?: string; render?: ReactNode }>;
  pagination?: boolean;
}

const getNestedValue = (
  obj: any,
  accessor: string | ((data: any) => React.ReactNode)
) => {
  if (typeof accessor === "function") {
    return accessor(obj);
  }

  if (accessor) {
    const keys = accessor.split(".");
    return keys.reduce((value, key) => (value ? value[key] : undefined), obj);
  }
};

const Table = ({
  checkbox,
  className,
  pagination,
  filters,
  data,
  payload,
  isFetching,
  columns,
  actions,
}: TableProps) => {
  const [selectAll, setSelectAll] = useState(false);
  const router = useRouter();
  const searchParams = useQueryString();

  const handleFilterChange = (event: any) => {
    searchParams.set({ name: "page", value: "1" });
    searchParams.set({ name: [event.target.name], value: event.target.value });
  };

  return (
    <div
      className={` border-2 rounded-lg animate__animated animate__fadeInUpBig ${className}`}
    >
      {/* Searching and filteration */}
      {filters && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex gap-2.5 flex-wrap items-end p-4 border-b border-gray-300"
        >
          {filters.map((item, index) => {
            return item?.type === "select" ? (
              <div key={index}>
                <label className="my-2 text-sm font-bold text-gray-500">
                  {item?.label?.toUpperCase()}
                </label>
                <select
                  value={
                    searchParams.get(`${item?.name}`)
                      ? searchParams.get(`${item?.name}`)
                      : ""
                  }
                  {...item}
                  onChange={handleFilterChange}
                  className={`${item?.className} bg-gray-50 border md:w-fit  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                >
                  <option value="">All</option>
                  {item?.options?.map((option, index) => {
                    return (
                      <option
                        key={index.toString() + 1}
                        value={option.value ? option.value : option.name}
                      >
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : item.placeholder?.includes("search") ? (
              <div className=" relative ">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <FaSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={
                    searchParams.get(`${item?.name}`)
                      ? searchParams.get(`${item?.name}`)
                      : ""
                  }
                  onChange={handleFilterChange}
                  {...item}
                  className={` p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ${item?.className}`}
                />
              </div>
            ) : (
              <input
                key={index}
                value={
                  searchParams.get(`${item?.name}`)
                    ? searchParams.get(`${item?.name}`)
                    : ""
                }
                onChange={handleFilterChange}
                className={` block h-10  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ${item?.className}`}
                {...item}
              />
            );
          })}
        </form>
      )}
      <div className="pt-2 relative overflow-x-auto  scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <table className="text-sm text-left rtl:text-right w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {checkbox && (
                <th className="px-4 py-3 w-full max-w-[150px]">
                  <div className="flex items-center">
                    <input
                      onClick={() => {
                        setSelectAll(!selectAll);
                      }}
                      // checked={}
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
              )}
              {columns?.map((heading, index) => (
                <th scope="col" key={index} className="px-6 py-3">
                  {heading.header.toUpperCase()}
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-6 py-3">
                  action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr className="w-full">
                <td
                  className="text-center text-lg py-4"
                  colSpan={checkbox ? columns.length + 1 : columns.length}
                >
                  <Loader />
                </td>
              </tr>
            ) : data?.length == 0 ? (
              <tr className="w-full">
                <td
                  className="text-center text-lg py-4"
                  colSpan={checkbox ? columns.length + 1 : columns.length}
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              data?.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex} className="bg-white border-b">
                    {checkbox && (
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            // onChange={() => {setSelectAll(false)}}
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                          />
                          <label className="sr-only">checkbox</label>
                        </div>
                      </td>
                    )}
                    {columns.map((column, index) => (
                      <td
                        className={
                          "px-6 py-4 w-fit max-w-[200px] font-medium text-gray-900  dark:text-white"
                        }
                        key={index}
                      >
                        {column.header.toLowerCase().includes("status") ? (
                          <CurrentStatus
                            type={getNestedValue(row, column.accessor)}
                          />
                        ) : (
                          getNestedValue(row, column.accessor)
                        )}
                      </td>
                    ))}
                    {actions && (
                      <td
                        className={
                          "px-4 py-4 flex gap-3 font-medium text-gray-900 whitespace-nowrap"
                        }
                      >
                        {actions.map((action, index) => (
                          <React.Fragment key={index}>
                            {action.type === "edit" ? (
                              <p
                                className="cursor-pointer"
                                onClick={() => {
                                  router.push(`${action.url}/${row?._id}`);
                                }}
                              >
                                <FaPencil className={"text-primary"} />
                              </p>
                            ) : (
                              <p>{action.render}</p>
                            )}
                          </React.Fragment>
                        ))}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && <Pagination payload={payload} />}
    </div>
  );
};

export default Table;
