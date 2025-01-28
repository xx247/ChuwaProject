import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import authReducer from './slice/authSlice';
import { HREmployeeApplicationReducer } from "./slice/HREmployeeApplicationSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    HREmployeeApplication: HREmployeeApplicationReducer,
  },
});