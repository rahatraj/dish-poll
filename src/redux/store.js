import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/AuthSlice'
import dishReducer from './slices/DishSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dish: dishReducer,
  }
})
