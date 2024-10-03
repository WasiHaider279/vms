import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "products",
    "categories",
    "addProduct",
    "updateProduct",
    "types",
    "inventory",
  ],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (payload) => ({
        url: `/vendor/product`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/vendor/product/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["addProduct"],
    }),
    updateProduct: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/vendor/product/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    getProductCategories: builder.query({
      query: (payload) => ({
        url: `/public/category`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    getProductType: builder.query({
      query: (payload) => ({
        url: `/public/type`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["types"],
    }),
    getInventory: builder.query({
      query: (payload) => ({
        url: `/vendor/product/inventory`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["inventory"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useAddProductMutation,
  useGetProductTypeQuery,
  useUpdateProductMutation,
  useGetInventoryQuery,
} = productApi;
export default productApi;
