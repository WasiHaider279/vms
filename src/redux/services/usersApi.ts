import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  // Define your user type
  id: number;
  // ... other properties
}

interface UserProfile {
  // Define your user profile type
  // ...
  userProfile: object;
}

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Replace with your API base URL
  tagTypes: ["user", "userProfile"],
  endpoints: (builder) => ({
    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "/admin/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "user", id: "LIST" }],
    }),
    getUsers: builder.query<User[], { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params: { page: 1, limit: 10, ...params },
      }),
      providesTags: [{ type: "user", id: "LIST" }],
    }),
    getCandidates: builder.query<User[], { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/admin/candidates",
        method: "GET",
        params: { page: 1, limit: 10, ...params },
      }),
      providesTags: [{ type: "user", id: "LIST" }],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: `/admin/users/${user?.id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: [{ type: "user", id: "LIST" }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "user", id: "LIST" }],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/admin/users/${id}`,
      providesTags: [{ type: "user" }],
    }),
    addUserProfileImage: builder.mutation<UserProfile, UserProfile>({
      query: (userProfile) => ({
        url: `/admin/users/profile-image`,
        method: "POST",
        body: userProfile,
      }),
      invalidatesTags: [{ type: "userProfile", id: "LIST" }],
    }),
    updateUserProfileImage: builder.mutation<
      UserProfile,
      UserProfile & { id: number }
    >({
      query: ({ userProfile, id }) => ({
        url: `/admin/users/profile-image/${id}`,
        method: "PATCH",
        body: userProfile,
      }),
      invalidatesTags: [{ type: "userProfile", id: "LIST" }],
    }),
    deleteUserProfileImage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/profile-image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "userProfile", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetCandidatesQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserProfileImageMutation,
  useUpdateUserProfileImageMutation,
  useAddUserProfileImageMutation,
} = usersApi;
export default usersApi;
