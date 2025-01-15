// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import { productReducer } from "./slices/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    // you can add more slices here
  },
  // middleware, devTools, etc. can go here if needed
});

export default store;
