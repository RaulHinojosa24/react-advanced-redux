import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addProduct(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalAmount: newItem.price,
          totalQuantity: 1,
        });
      } else {
        existingItem.totalAmount += newItem.price;
        existingItem.totalQuantity++;
      }
    },
    removeProduct(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (item.totalQuantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        item.totalQuantity--;
        item.totalAmount -= item.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
