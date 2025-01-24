import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from './slice/authSlice';


export const store = configureStore({
  reducer: {

    auth: authReducer,

  },
});