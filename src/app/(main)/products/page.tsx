"use client";
import Table from "@/components/global/Table";
import { useQueryString } from "@/hooks/useQueryString";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { productColumns } from "@/utils/data";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

const Products = () => {
  const router = useRouter();
  const searchParams = useQueryString();
  const { data: productData, isFetching } = useGetProductsQuery(
    searchParams.getAll()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Products</h1>
        <button
          onClick={() => {
            router.push("/products/add");
          }}
          className="btn !text-sm"
        >
          <FaPlus /> Add Products
        </button>
      </div>
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
            type: "select",
            name: "status",
            label: "Status",
            options: [
              { name: "Pending", value: "Pending" },
              { name: "Approved", value: "Approved" },
              { name: "Rejected", value: "Rejected" },
            ],
          },
          {
            type: "text",
            name: "text",
            placeholder: "search by name",
          },
        ]}
        checkbox={false}
        columns={productColumns}
        data={productData?.data?.items}
        pagination={true}
        isFetching={isFetching}
        payload={{
          page: productData?.data?.page,
          limit: productData?.data?.limit,
          total: productData?.data?.total,
          pages: productData?.data?.pages,
        }}
        actions={[{ type: "edit", url: "/products" }]}
      />
    </div>
  );
};

export default Products;
