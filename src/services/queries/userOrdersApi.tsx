import { apiSlice } from "../apiSlice";

const userOrdersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({

    getUserOrders: builder.query({
      query: (email: string) => ({
        url: `/api/userOrders/${email}`,
        method: "GET",
      }),
    }),

    saveOrder: builder.mutation({
      query: (data: any) => ({
        url: `/api/userOrders/save`,
        method: "POST",
        body: data,
      }),
    }),

    makePayment: builder.mutation({
      query: (data: any) => ({
        url: `/api/userOrders/payment-intent`,
        method: "POST",
        body: data,
      }),
    }),

    updatePayment: builder.mutation({
      query: (data: any) => ({
        url: `/api/userOrders/payment/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useMakePaymentMutation,
  useUpdatePaymentMutation,
  useSaveOrderMutation,
} = userOrdersApi;
