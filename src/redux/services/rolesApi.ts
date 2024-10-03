import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["role"],
  endpoints: (builder) => ({
    addRole: builder.mutation({
      query: (role) => ({
        url: "/admin/roles/add",
        method: "POST",
        body: role,
      }),
      invalidatesTags: ["role"],
    }),
    getRoles: builder.query({
      query: ({ page = 1, limit = "10", text = "", all = "" }) => ({
        url: `/admin/roles?page=${page}&limit=${limit}&text=${text}&all=${all}`,
        method: "GET",
      }),
      providesTags: ["role"],
    }),
    updateRole: builder.mutation({
      query: ({ role, id }) => ({
        url: `/admin/roles/update/${id}`,
        method: "PUT",
        body: role,
      }),
      invalidatesTags: ["role"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/admin/roles/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["role"],
    }),
    getRoleById: builder.query({
      query: (id) => `/admin/roles?id=${id}`,
      providesTags: ["role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useDeleteRoleMutation,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
  useAddRoleMutation,
} = rolesApi;
export default rolesApi;
