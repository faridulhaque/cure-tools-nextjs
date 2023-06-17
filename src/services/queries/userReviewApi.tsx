import { apiSlice } from "../apiSlice";

const userReviewApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      getReview: builder.query({
        query: (email:string) => ({
          url: `/myReview/${email}`,
          method: "GET",
        }),
      }),
      addReview: builder.mutation({
        query: (data:any) => ({
          url: `/myReview/${data.email}`,
          method: "PUT",
          body: data,
        }),
      }),
  


    }),
  });


export const {useGetReviewQuery, useAddReviewMutation} = userReviewApi; 