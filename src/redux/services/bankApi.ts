import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["bank"],
  endpoints: (builder) => ({
    addBank: builder.mutation({
      query: (data) => ({
        url: "/vendor/bank/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
    }),
    getBank: builder.query({
      query: ({ page = 1, limit = "10", text = "", id }) => ({
        url: `/vendor/bank`,
        method: "GET",
        params: {
          page,
          limit,
          text,
          id,
        },
      }),
      providesTags: ["bank"],
    }),
    updateBank: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/vendor/bank/update/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["bank"],
    }),
  }),
});

export const { useAddBankMutation, useGetBankQuery, useUpdateBankMutation } =
  bankApi;
export default bankApi;
