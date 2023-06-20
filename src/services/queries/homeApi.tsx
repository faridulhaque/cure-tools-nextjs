import { apiSlice } from "../apiSlice";

const homeApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getInventories: builder.query({
      query: () => ({
        url: `/api/home/tools`,
        method: "GET",
      }),
    }),

    getOneProduct: builder.query({
      query: (id: string) => ({
        url: `/api/home/tool/${id}`,
        method: "GET",
      }),
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: `/api/home/reviews`,
        method: "GET",
      }),
    }),

    makeContact: builder.mutation({
      query: (data: any) => ({
        url: `/api/home/contact`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetInventoriesQuery,
  useGetOneProductQuery,
  useGetAllReviewsQuery,
  useMakeContactMutation,
} = homeApi;
