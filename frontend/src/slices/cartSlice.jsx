import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utlis/cartUtilis";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

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
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
