import { apiSlice } from "../apiSlice";

const userReviewApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getReview: builder.query({
      query: (email: string) => ({
        url: `/api/myReview/get/${email}`,
        method: "GET",
      }),
      providesTags: ["user_review"],
    }),
    addReview: builder.mutation({
      query: (data: any) => ({
        url: `/api/myReview/update/${data.email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user_review"],
    }),
  }),
});

export const { useGetReviewQuery, useAddReviewMutation } = userReviewApi;
