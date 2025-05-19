import { createSlice } from '@reduxjs/toolkit'

const userFromStorage = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const initialState = {
  user:  userFromStorage || null,
  isLoggedIn: isLoggedIn || false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isLoggedIn = true
      state.error = null
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
      state.error = null
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

export const { login, logout, setError } = authSlice.actions

export default authSlice.reducer
