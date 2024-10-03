import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Locations", "addLocation"],
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (payload) => ({
        url: `/vendor/location`,
        params: {
          ...payload,
        },
        method: "GET",
      }),
      providesTags: ["Locations"],
    }),
    addLocation: builder.mutation({
      query: (payload) => ({
        url: "vendor/location/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Locations"],
    }),
    updateLocation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/vendor/location/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Locations"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useAddLocationMutation,
  useUpdateLocationMutation,
} = locationApi;
export default locationApi;
