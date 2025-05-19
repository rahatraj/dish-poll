import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const DISH_API = 'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'

// Async thunk to fetch dishes
export const fetchDishes = createAsyncThunk('dish/fetchDishes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(DISH_API)
    return response.data
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch dishes')
  }
})

const initialState = {
  dishes: [],
  rankings: {},
  status: 'idle',
  error: null,
}

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    updateRanking(state, action) {
      const { dishId, rank } = action.payload

      // Validate maximum 3 rankings
      if (rank && Object.keys(state.rankings).length >= 3 && !state.rankings[dishId]) {
        return
      }

      // Remove any dish with the same rank
      for (const [id, r] of Object.entries(state.rankings)) {
        if (r === rank) {
          delete state.rankings[id]
        }
      }

      // Toggle the rank (remove if already same rank)
      if (state.rankings[dishId] === rank) {
        delete state.rankings[dishId]
      } else {
        state.rankings[dishId] = rank
      }
    },
    setRankings(state, action) {
      state.rankings = action.payload
    },
    clearRankings(state) {
      state.rankings = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dishes = action.payload
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Selectors
export const selectAllDishes = (state) => state.dish.dishes
export const selectDishStatus = (state) => state.dish.status
export const selectDishError = (state) => state.dish.error
export const selectRankings = (state) => state.dish.rankings
export const selectRankingCount = (state) => Object.keys(state.dish.rankings).length

export const { updateRanking, setRankings, clearRankings } = dishSlice.actions

export default dishSlice.reducer
