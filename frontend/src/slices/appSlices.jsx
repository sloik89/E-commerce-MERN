import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "/api" });
export const appSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
