import { apiSlice } from "../apiSlice";

const homeApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      getInventories: builder.query({
        query: () => ({
          url: `/tools`,
          method: "GET",
        }),
      }),
  


    }),
  });


export const {useGetInventoriesQuery} = homeApi; 