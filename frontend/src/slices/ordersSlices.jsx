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
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalCientId: builder.query({
      query: () => ({
        url: "/config/paypal",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetPayPalCientIdQuery,
  usePayOrderMutation,
} = orderApiSlice;
