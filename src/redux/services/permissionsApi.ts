import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["permission"],
  endpoints: (builder) => ({
    addPermission: builder.mutation({
      query: (permission) => ({
        url: "/admin/permissions/add",
        method: "POST",
        body: permission,
      }),
      invalidatesTags: ["permission"],
    }),
    getPermissions: builder.query({
      query: ({ page = 1, limit = "10", text = "" }) => ({
        url: `/admin/permissions?page=${page}&limit=${limit}&text=${text}`,
        method: "GET",
      }),
      providesTags: ["permission"],
    }),
    updatePermission: builder.mutation({
      query: ({ permission, id }) => ({
        url: `/admin/permissions/update/${id}`,
        method: "PUT",
        body: permission,
      }),
      invalidatesTags: ["permission"],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/admin/permissions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["permission"],
    }),
    getPermissionById: builder.query({
      query: (id) => `/admin/permissions?id=${id}`,
      providesTags: ["permission"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useDeletePermissionMutation,
  useGetPermissionByIdQuery,
  useUpdatePermissionMutation,
  useAddPermissionMutation,
} = permissionsApi;
export default permissionsApi;
