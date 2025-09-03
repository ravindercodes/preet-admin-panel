import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const dmApi = createApi({
    reducerPath: "dmApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:8080',
    }),
    tagTypes: ["supplier", "admission", "contact", "auth","admissionById"],
    endpoints: () => ({}),
})