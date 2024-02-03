import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlices";
import cartSliceReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    [appSlice.reducerPath]: appSlice.reducer,
    cart: cartSliceReducer,
  },

  middleware: (getDefultMiddleware) =>
    getDefultMiddleware().concat(appSlice.middleware),
  devTools: true,
});
export default store;
