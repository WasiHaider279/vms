import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

// export const baseUrl = "http://localhost:5000/api";

export const baseUrl =
  "https://ismmart-ecommerce-backend-e233368b3b0d.herokuapp.com/api";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc4MDlkNjYzNTM0ZTNmY2ZiMTljNzIiLCJuYW1lIjoiVmVuZG9yMSIsImlhdCI6MTcwNDE3NDA1OSwiZXhwIjoxNzA2NzY2MDU5fQ.uEN11FujgwOnS2Gwr3w9sQ2KwLCKJJOKsdRQAGrc6rQ";
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return headers;
  },
});

export default baseQueryWithAuth;
