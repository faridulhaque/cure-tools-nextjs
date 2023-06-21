import { apiSlice } from "../apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addProduct: builder.mutation({
      query: (data: any) => ({
        url: `/api/admin/tools`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inventories"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/api/admin/tool/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inventories"],
    }),

    getOrders: builder.query({
      query: () => ({
        url: `/api/admin/orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    getUsers: builder.query({
      query: () => ({
        url: `/api/admin/users`,
        method: "GET",
      }),
      providesTags: ["members"],
    }),

    handleAdmin: builder.mutation({
      query: (data: any) => ({
        url: `/api/admin/${data.email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["members"],
    }),

    makeShipment: builder.mutation({
      query: (id: any) => ({
        url: `/api/admin/shipment/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetOrdersQuery,
  useDeleteProductMutation,
  useGetUsersQuery,
  useHandleAdminMutation,
  useMakeShipmentMutation,
} = adminApi;
