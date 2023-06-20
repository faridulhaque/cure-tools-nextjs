import { apiSlice } from "../apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addProduct: builder.mutation({
      query: (data: any) => ({
        url: `/api/admin/tools`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/api/admin/tool/${id}`,
        method: "DELETE",
      }),
    }),

    getOrders: builder.query({
      query: () => ({
        url: `/api/admin/orders`,
        method: "GET",
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `/api/admin/users`,
        method: "GET",
      }),
    }),

    handleAdmin: builder.mutation({
      query: (data: any) => ({
        url: `/api/admin/${data.email}`,
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
