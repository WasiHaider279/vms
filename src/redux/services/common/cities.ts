import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../../apiConfig";

const citiesApi = createApi({
  reducerPath: "citiesApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["cities"],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (data) => ({
        url: "/public/cities",
        method: "GET",
        body:data,
      }),
      providesTags: ["cities"],
    }),
    
   
  }),
});

export const {
useGetCountriesQuery,
  
} = citiesApi;
export default citiesApi;
