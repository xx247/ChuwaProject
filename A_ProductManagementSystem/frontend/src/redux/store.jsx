// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from './authSlice';
import { productReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    allCart: cartReducer,
    auth: authReducer,
    product: productReducer,
  },
});
