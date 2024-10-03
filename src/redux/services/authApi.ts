import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../apiConfig";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["auth"],
  
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/vendor/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: "/vendor/auth/verify",
        method: "POST",
        body: credentials,
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/vendor/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset`,
        method: "PUT",
        body: data,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/vendor/auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    reverify: builder.mutation({
      query: () => ({
        url: `/vendor/auth/reverify`,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    addProfileImage: builder.mutation({
      query: (profileImage) => ({
        url: `/users/profile-image`,
        method: "POST",
        body: profileImage,
      }),
      invalidatesTags: ["auth"],
    }),
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: "/vendor/auth/resend",
        method: "POST",
        body: data,
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (profileImage) => ({
        url: `/users/profile-image`,
        method: "PATCH",
        body: profileImage,
      }),
      invalidatesTags: ["auth"],
    }),
    deleteProfileImage: builder.mutation({
      query: () => ({
        url: `/users/profile-image`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useGetCurrentUserQuery,
  useProfileUpdateMutation,
  useReverifyMutation,
  useAddProfileImageMutation,
  useUpdateProfileImageMutation,
  useDeleteProfileImageMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} = authApi;
export default authApi;
