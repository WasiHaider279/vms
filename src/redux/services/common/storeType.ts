import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../../apiConfig";

const storeTypesApi = createApi({
  reducerPath: "storeTypesApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["storeTypes"],
  endpoints: (builder) => ({
    getStoreTypes: builder.query({
      query: () => ({
        url: "/public/storeType",
        method: "GET",
      }),
      providesTags: ["storeTypes"],
    }),
    
   
  }),
});

export const { useGetStoreTypesQuery } = storeTypesApi;
export default storeTypesApi;
