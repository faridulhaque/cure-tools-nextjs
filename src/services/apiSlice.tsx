import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_API }),
  tagTypes: [
    "profile",
    "my_orders",
    "user_review",
    "inventories",
    "orders",
    "members",
  ],
  endpoints: (build) => ({}),
});
