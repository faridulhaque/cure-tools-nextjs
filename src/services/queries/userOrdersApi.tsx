import { apiSlice } from "../apiSlice";

const userOrdersApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      getUserOrders: builder.query({
        query: (email:string) => ({
          url: `/myOrders/${email}`,
          method: "GET",
        }),
      }),
      
  


    }),
  });


export const {useGetUserOrdersQuery} = userOrdersApi; 