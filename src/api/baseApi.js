import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.5.77:3000/v1" }),
  endpoints: (builder) => ({
    getAllWorkflows: builder.query({
      query: () => `workflow`,
    }),
    getWorkflowById: builder.query({
      query: (id) => `workflow/${id}`,
    }),
    getAvailableModels: builder.query({
      query: (name) => `models`,
    }),
    getAllTemplates: builder.query({
      query: (name) => `templates`,
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
    getWorkflowById: builder.query({
      query: (id) => `workflow/${id}`,
    }),
    updateWorkflow: builder.mutation({
      query: ({payload, id}) => {
        return {
          method: "PUT",
          url: `workflow/${id}`,
          body: payload,
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
  useTriggerWorkflowMutation,
  useGetWorkflowByIdQuery,
  useLazyGetWorkflowByIdQuery,
  useUpdateWorkflowMutation,
  useGetAllTemplatesQuery
} = pokemonApi;
