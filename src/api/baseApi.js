import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.5.77:3001/v1" }),
  endpoints: (builder) => ({
    getAllWorkflows: builder.query({
      query: () => `workflow`,
    }),
    getAvailableModels: builder.query({
      query: (name) => `models`,
    }),
    callModel: builder.mutation({
      query: ({ url, data }) => {
        return {
          method: "POST",
          url,
          body: data, // The data to send in the POST request.
        };
      },
    }),
    saveWorkflow: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: 'workflow',
          body: data,
        }
      }
    }),
    triggerWorkflow: builder.mutation({
      query: ({ url, data }) => {
        return {
          method: "POST",
          url,
          body: data, // The data to send in the POST request.
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useGetAllWorkflowsQuery,
  useCallModelMutation,
  useGetAvailableModelsQuery,
  useSaveWorkflowMutation,
  useTriggerWorkflowMutation
} = pokemonApi;
