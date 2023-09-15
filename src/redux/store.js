import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { pokemonApi, flaskApi } from "../api/baseApi";
import compareSlice from "./compareSlice";

export const store = configureStore({
  reducer: {
    compare: compareSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [flaskApi.reducerPath]: flaskApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, flaskApi.middleware),
});
