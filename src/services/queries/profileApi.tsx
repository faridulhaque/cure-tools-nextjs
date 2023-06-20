import { apiSlice } from "../apiSlice";

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getUserProfile: builder.query({
      query: (email: any) => ({
        url: `/api/profile/me/${email}`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    updateUserProfile: builder.mutation({
      query: (data: any) => ({
        url: `/api/profile/update/${data.email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  profileApi;
