import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  compareModelData: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCompareModelData: (state, action) => {
      state.compareModelData = action.payload
    },
  },
})

export const { setCompareModelData } = counterSlice.actions

export default counterSlice.reducer
