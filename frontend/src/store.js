import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlices";
const store = configureStore({
  reducer: {
    [appSlice.reducerPath]: appSlice.reducer,
  },
  middleware: (getDefultMiddleware) =>
    getDefultMiddleware().concat(appSlice.middleware),
  devTools: true,
});
export default store;
