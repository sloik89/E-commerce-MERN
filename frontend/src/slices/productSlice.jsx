import { appSlice } from "./appSlices";

export const productsSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      // fresh data you don't have to reload page
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: "/uploads",
        method: "POST",
        body: data,
      }),
    }),
    deleteProducts: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductsMutation,
} = productsSlice;
