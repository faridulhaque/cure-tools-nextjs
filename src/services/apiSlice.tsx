import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["profile", "my_orders", "user_review", "inventories", "orders", "members"],
    endpoints: (build) => ({}) 
})