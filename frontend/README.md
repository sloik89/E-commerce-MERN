### React Redux Toolkit

# Create api routes using redux

- Dealing with backend API
- This is parent for api calls
- createApi dealing with asychronous request

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
``;

const baseQuery = fetchBaseQuery({ baseUrl: "/api" });
export const appSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
```

## Inject api routes to parent

```js
import { appSlice } from "./appSlices";

export const productsSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      keepUnusedDataFor: 5,
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
```

## Configure store to using api calls from redux

```js
const store = configureStore({
  reducer: {
    [appSlice.reducerPath]: appSlice.reducer,
    cart: cartSliceReducer,
  },

  middleware: (getDefultMiddleware) =>
    getDefultMiddleware().concat(appSlice.middleware),
  devTools: true,
});
```

## Export function to make quary

```js
export const { useGetProductsQuery, useGetSingleProductQuery } = productsSlice;
```
