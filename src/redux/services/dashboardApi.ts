import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["dashboard", "revenue", "product", "orderStatus"],
  endpoints: (builder) => ({
    OrdersSummary: builder.query({
      query: (payload) => ({
        url: `/vendor/dashboard/summary/order`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    RevenueSummary: builder.query({
      query: (payload) => ({
        url: `/vendor/dashboard/summary/revenue`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["revenue"],
    }),
    ProductsSummary: builder.query({
      query: (payload) => ({
        url: `/vendor/dashboard/summary/product`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    OrdersStatus: builder.query({
      query: (payload) => ({
        url: `/vendor/dashboard/summary/order/status`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["orderStatus"],
    }),
  }),
});

export const {
  useOrdersSummaryQuery,
  useRevenueSummaryQuery,
  useProductsSummaryQuery,
  useOrdersStatusQuery,
} = dashboardApi;
export default dashboardApi;
