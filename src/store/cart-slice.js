import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  inititalState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.item);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
