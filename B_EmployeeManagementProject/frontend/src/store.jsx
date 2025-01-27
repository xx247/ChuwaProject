import { configureStore } from '@reduxjs/toolkit'
import { HREmployeeApplicationReducer } from './features/HREmployeeApplicationSlice'

export default configureStore({
  reducer: {
    HREmployeeApplication: HREmployeeApplicationReducer
  },
})