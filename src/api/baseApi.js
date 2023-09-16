import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.5.77:3001/v1" }),
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
    getModels: builder.query({
      query: (name) => `models/hierarchy`,
    }),

    saveWorkflow: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "workflow",
          body: data,
        };
      },
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
    updateWorkflow: builder.mutation({
      query: ({ payload, id }) => {
        return {
          method: "PUT",
          url: `workflow/${id}`,
          body: payload,
        };
      },
    }),
    generateAiWorkFlow: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: '/wai',
          body: data, // The data to send in the POST request.
        };
      },
    })
  }),
});

export const flaskApi = createApi({
  reducerPath: "flaskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.3.117:5000" }),
  endpoints: (builder) => ({
    callModel: builder.mutation({
      query: ({ url, data }) => {
        return {
          method: "POST",
          url,
          body: data, // The data to send in the POST request.
        };
      },
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useGetAllWorkflowsQuery,
  useGetAvailableModelsQuery,
  useSaveWorkflowMutation,
  useTriggerWorkflowMutation,
  useGetWorkflowByIdQuery,
  useLazyGetWorkflowByIdQuery,
  useUpdateWorkflowMutation,
  useGetAllTemplatesQuery,
  useGetModelsQuery,
  useGenerateAiWorkFlowMutation
} = pokemonApi;

export const { useCallModelMutation } = flaskApi;
