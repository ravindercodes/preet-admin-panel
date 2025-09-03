import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const dmApi = createApi({
    reducerPath: "dmApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.preetinstitute.in",
    }),
    tagTypes: ["supplier", "admission", "contact", "auth","admissionById"],
    endpoints: () => ({}),
})
