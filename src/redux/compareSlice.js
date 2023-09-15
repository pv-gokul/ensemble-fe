import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputType: "text",
  outputType: "image",
  models: [
    {
      name: "Stable Diffusion",
      url: "sd",
    },
    {
      name: "Open Jouney",
      url: "open-journey",
    },
    {
      name: "Real Vision",
      url: "real-vis",
    },
    {
      name: "Anything",
      url: "anything",
    },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
