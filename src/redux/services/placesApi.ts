import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";
import { ICityPayload, ICountryPayload } from "@/types/placesTypes";

const placesapi = createApi({
  reducerPath: "placesApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["countries", "cities"],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (payload: ICountryPayload) => ({
        url: `/places/countries`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["countries"],
    }),
    getCities: builder.query({
      query: (payload: ICityPayload) => ({
        url: `/places/cities`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["cities"],
    }),
  }),
});

export const { useGetCountriesQuery, useGetCitiesQuery } = placesapi;
export default placesapi;
