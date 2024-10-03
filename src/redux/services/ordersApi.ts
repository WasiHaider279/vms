import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (payload) => ({
        url: `/vendor/order`,
        params: payload,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: (data: any) => ({
        url: `/vendor/order/update/${data.id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: (data: any) => ({
        url: `/vendor/order/update/status`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
export default ordersApi;
