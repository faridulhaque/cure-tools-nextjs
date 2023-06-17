import { apiSlice } from "../apiSlice";

const userOrdersApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      getUserOrders: builder.query({
        query: (email:string) => ({
          url: `/myOrders/${email}`,
          method: "GET",
        }),
      }),

      makePayment: builder.mutation({
        query: (data:any) => ({
          url: `/create-payment-intent`,
          method: "POST",
          body: data
        }),
      }),

      updatePayment: builder.mutation({
        query: (data:any) => ({
          url: `/order/payment/${data.id}`,
          method: "PUT",
          body: data
          
        }),
      }),
      
  


    }),
  });


export const {useGetUserOrdersQuery, useMakePaymentMutation, useUpdatePaymentMutation} = userOrdersApi; 