import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
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
      if (item.totalQuantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        item.totalQuantity--;
        item.totalAmount -= item.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    fetch(
      "https://react-http-b3296-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      { method: "PUT", body: JSON.stringify(cart) }
    )
      .then((response) => {
        dispatch(
          uiActions.setNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully!",
          })
        );
        return response.json();
      })
      .catch((error) => {
        dispatch(
          uiActions.setNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      });
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
