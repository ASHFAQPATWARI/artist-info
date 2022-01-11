import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINTS } from "../../config/constants";

// Using RTK create api for demo purpose
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => ENDPOINTS.GET_TOKEN,
    }),
  }),
});

export const { useGetTokenQuery } = apiSlice;
