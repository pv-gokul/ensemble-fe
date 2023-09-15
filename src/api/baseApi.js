import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.4.163:3000/v1/' }),
  endpoints: (builder) => ({
    getAvailableModels: builder.query({
      query: (name) => `models`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAvailableModelsQuery } = pokemonApi