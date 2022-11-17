import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";

const store = configureStore(cartSlice);

export default store;
