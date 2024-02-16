import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utlis/cartUtilis";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // actual value sending from frontend
      const item = action.payload;
      // check if item already exsist
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        // update item if the same
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // add new  item to state
        state.cartItems = [...state.cartItems, item];
      }
      state.totalItemCart = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
      );
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      console.log(action);
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
