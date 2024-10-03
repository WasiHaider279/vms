"use client";
import Table from "@/components/global/Table";
import { useQueryString } from "@/hooks/useQueryString";
import { useGetLocationsQuery } from "@/redux/services/locationApi";
import { LocationColumns, data } from "@/utils/data";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

const Locations = () => {
  const searchParams = useQueryString();
  const {
    data: locationData,
    isFetching,
    isLoading,
  } = useGetLocationsQuery(searchParams.getAll());
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center my-4 justify-between ">
        <h1 className="text-2xl font-bold ">Locations</h1>
        <button
          onClick={() => {
            router.push("/locations/add");
          }}
          className="btn !text-sm"
        >
          <FaPlus /> Add Location
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table
          filters={[
            {
              type: "select",
              name: "sort[createdAt]",
              label: "Created At",
              options: [
                { name: "Ascending", value: "1" },
                { name: "Descending", value: "-1" },
              ],
            },
            {
              type: "select",
              name: "sort[updatedAt]",
              label: "Updated At",
              options: [
                { name: "Ascending", value: "1" },
                { name: "Descending", value: "-1" },
              ],
            },

            {
              type: "text",
              name: "text",
              placeholder: "search by name",
            },
          ]}
          checkbox={false}
          columns={LocationColumns}
          data={locationData?.data?.items}
          pagination={true}
          payload={{
            page: locationData?.data?.page,
            limit: locationData?.data?.limit,
            total: locationData?.data?.total,
            pages: locationData?.data?.pages,
          }}
          isFetching={isFetching}
          actions={[{ type: "edit", url: "/locations" }]}
        />
      </div>
    </div>
  );
};

export default Locations;
