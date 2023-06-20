import { apiSlice } from "../apiSlice";

const userOrdersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getUserOrders: builder.query({
      query: (email: string) => ({
        url: `/api/userOrders/${email}`,
        method: "GET",
      }),
      providesTags: ["my_orders"],
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
      invalidatesTags: ["my_orders"],
    }),

    cancelOrder: builder.mutation({
      query: (id: any) => ({
        url: `/api/userOrders/del/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["my_orders"],
    }),

    // update payment will change the payment status in orders collection. it will be done by admins.

    updatePayment: builder.mutation({
      query: (data: any) => ({
        url: `/api/userOrders/payment`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["my_orders"],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useMakePaymentMutation,
  useUpdatePaymentMutation,
  useSaveOrderMutation,
  useCancelOrderMutation,
} = userOrdersApi;
