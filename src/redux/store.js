import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { pokemonApi } from '../api/baseApi';
import counterSlice from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})