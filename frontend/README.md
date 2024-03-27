### React Redux Toolkit

# Why we use api routes using redux

- Dealing with backend API
- This is parent for api calls
- createApi dealing with asychronous request

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

### How to create api slice?

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

- you will inject endpoints to the appSlice

### How to inject endpoints and export ?

- when you use post method add mutation exmp. builder.mutataion

```js
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
```

```js
export const { useLoginMutation } = userApiSlice;
```

```

```

### How to create Private route?

- create private components

```js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

- add route to main

```js
<Route path="" element={<PrivateRoute />}>
  <Route path="/shipping" element={<Shipping />} />
</Route>
```

### How to redirect works?

- In cart page when you click Procced to checkout

  ```js
  const proccedCheckout = () => {
    navigate("/login?redirect=/shipping");
  };
  ```

- In Login page

```js
const { search } = useLocation();
// ?redirect=/shipping
const url = new URLSearchParams(search);
const redirect = url.get("redirect") || "/";
// /shipping or /
useEffect(() => {
  if (userInfo) {
    // if user present redirect to shipping
    navigate(redirect);
  }
}, [userInfo, redirect, navigate]);
```

### Paypal integration

- npm package

```js
  "@paypal/react-paypal-js": "^8.1.3",
```

- wrap app with PayPalProvider

```js
<PayPalScriptProvider deferLoading={true}>
  <RouterProvider router={router} />
</PayPalScriptProvider>
```

### Pagination

- On server
  - pageSize is a products display per page
  - page is sendig from frontend by useParams, default 1
  - count calculate all products
  ```js
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();
  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  console.log(count);
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
  ```
- On frontend
  - pages and page comes from backend

```js
const Pagination = ({ pages, page, isAdmin = false, keyword }) => {
  return (
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((item) => {
          return (
            <Link
              className={`btn-pagination ${item + 1 === page ? "active" : ""}`}
              key={item}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${item + 1}`
                    : `/page/${item + 1}`
                  : `/admin/productlist/${item + 1}`
              }
            >
              {item + 1}
            </Link>
          );
        })}
      </div>
    )
  );
};
```
