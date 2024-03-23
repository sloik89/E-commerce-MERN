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
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      queryy: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutUserMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = userApiSlice;
