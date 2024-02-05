import { appSlice } from "./appSlices";
export const userApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
