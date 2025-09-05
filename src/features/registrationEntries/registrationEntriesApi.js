import {dmApi} from "@/app/dmApi";
import {getAuthorizationHeader, getFormDataAuthorizationHeader} from "@/helpers/RtkQueryUtils";

export const registrationEntriesApi = dmApi.injectEndpoints({
    endpoints: (build) => ({
        // Get registration entries for an admission
        getRegistrationEntries: build.query({
            query: (status) => ({
                url: `/api/admission/status/registration`,
                method: 'GET',
                headers: getAuthorizationHeader(),
            }),
            providesTags: ['registrationEntries'],
        }),

        // Get a single registration entry
        getRegistrationEntryById: build.query({
            query: (entryId) => ({
                url: `/api/admission/${entryId}`,
                method: 'GET',
                headers: getAuthorizationHeader(),
            }),
            providesTags: ['registrationEntry'],
        }),

        // Create a new registration entry
        createRegistrationEntry: build.mutation({
            query: (formData) => ({
                url: '/api/admission/create',
                method: 'POST',
                headers: formData instanceof FormData
                    ? getFormDataAuthorizationHeader()
                    : getAuthorizationHeader(),
                body: formData,
            }),
            invalidatesTags: ['registrationEntries'],
        }),

        // Update a registration entry
        updateRegistrationEntry: build.mutation({
            query: ({ entryId, formData }) => ({
                url: `/api/admission/${entryId}/update`,
                method: 'POST',
                headers: formData instanceof FormData
                    ? getFormDataAuthorizationHeader()
                    : getAuthorizationHeader(),
                body: formData,
            }),
            invalidatesTags: ['registrationEntries', 'registrationEntry'],
        }),

        // Delete a registration entry
        deleteRegistrationEntry: build.mutation({
            query: (entryId) => ({
                url: `/api/registration/${entryId}/delete`,
                method: 'DELETE',
                headers: getAuthorizationHeader(),
            }),
            invalidatesTags: ['registrationEntries'],
        }),

        // Upload documents for a registration entry
        uploadRegistrationDocument: build.mutation({
            query: ({ entryId, formData }) => ({
                url: `/api/registration/${entryId}/upload-document`,
                method: 'POST',
                headers: getFormDataAuthorizationHeader(),
                body: formData,
            }),
            invalidatesTags: ['registrationEntries', 'registrationEntry'],
        }),
    }),
});

export const {
    useGetRegistrationEntriesQuery,
    useGetRegistrationEntryByIdQuery,
    useCreateRegistrationEntryMutation,
    useUpdateRegistrationEntryMutation,
    useDeleteRegistrationEntryMutation,
    useUploadRegistrationDocumentMutation,
} = registrationEntriesApi;
