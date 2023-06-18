import { apiSlice } from "../apiSlice";

const homeApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      getInventories: builder.query({
        query: () => ({
          url: `/tools`,
          method: "GET",
        }),
      }),

      getOneProduct: builder.query({
        query: (id:string) => ({
          url: `/tool/${id}`,
          method: "GET",
        }),
      }),

    
  


    }),
  });


export const {useGetInventoriesQuery, useGetOneProductQuery} = homeApi; 