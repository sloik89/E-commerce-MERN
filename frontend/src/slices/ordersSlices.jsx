import { appSlice } from "./appSlices";
export const orderApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useCreateOrderMutation, useGetOrderByIdQuery } = orderApiSlice;
