import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../../apiConfig";

const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["countries"],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/public/countries",
        method: "GET",
      }),
      providesTags: ["countries"],
    }),
    
   
  }),
});

export const {
useGetCountriesQuery,
  
} = countriesApi;
export default countriesApi;
