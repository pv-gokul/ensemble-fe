import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  models: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCompareModelData: (state, action) => {
      state.models = action.payload;
    },
  },
});

export const { setCompareModelData } = counterSlice.actions;

export default counterSlice.reducer;
