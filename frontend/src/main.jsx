import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./components";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import {
  Home,
  Product,
  Cart,
  Login,
  Register,
  Shipping,
  Payment,
  PlaceOrder,
  Order,
  Profile,
  AdminOrders,
  AdminProducts,
  AdminEditProduct,
  AdminUsers,
  AdminEditUser,
} from "./Page";
import { AdminRoute } from "./components";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<AdminOrders />} />
        <Route path="/admin/productlist" element={<AdminProducts />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<AdminProducts />}
        />
        <Route path="/admin/product/:id/edit" element={<AdminEditProduct />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/:id/edit" element={<AdminEditUser />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
      <ToastContainer />
    </HelmetProvider>
  </React.StrictMode>
);
