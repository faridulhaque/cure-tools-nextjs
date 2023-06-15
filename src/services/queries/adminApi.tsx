import { apiSlice } from "../apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addProduct: builder.mutation({
      query: (data: any) => ({
        url: `/tools`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/tool/${id}`,
        method: "DELETE",
      }),
    }),

    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),

    handleAdmin: builder.mutation({
      query: (data: any) => ({
        url: `/handleAdmin/${data.email}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetOrdersQuery,
  useDeleteProductMutation,
  useGetUsersQuery,
  useHandleAdminMutation,
} = adminApi;
