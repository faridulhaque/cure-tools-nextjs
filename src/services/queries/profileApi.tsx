import { apiSlice } from "../apiSlice";

const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      getUserProfile: builder.query({
        query: (email:any) => ({
          url: `/user/${email}`,
          method: "GET",
        }),
      }),

      updateUserProfile: builder.mutation({
        query: (data:any) => ({
          url: `/profile/${data.email}`,
          method: "PUT",
          body: data
        }),
      }),
  


    }),
  });


export const {useGetUserProfileQuery, useUpdateUserProfileMutation} = profileApi; 