// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    allCart: cartReducer,
    // you can add more slices here
  },
});
