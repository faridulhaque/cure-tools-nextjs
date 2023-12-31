import { apiSlice } from "../apiSlice";

const registerApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
      

      registerUser: builder.mutation({
        query: (data:any) => ({
          url: "/api/register/new",
          method: "POST",
          body: data,
        }),
      }),
  


    }),
  });


export const {useRegisterUserMutation} = registerApi; 