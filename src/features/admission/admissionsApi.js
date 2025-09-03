import {dmApi} from "@/app/dmApi";
import {getAuthorizationHeader, getFormDataAuthorizationHeader} from "@/helpers/RtkQueryUtils";

export const admissionsApi = dmApi.injectEndpoints({
    endpoints: (build) => ({
        approveAdmission: build.mutation({
            query: (admissionId) => ({
                url: `/api/admission/${admissionId}/approve`,
                method: 'POST',
                headers: getAuthorizationHeader(),

            }),
            invalidatesTags: ['admission','admissionById'],
        }),

        // Get not approved admissions
        getNotApprovedAdmissions: build.query({
            query: () => {
                const headers = getAuthorizationHeader();
                console.log("Request headers:", headers);
                return {
                    url: '/api/admission/status/pending',
                    method: 'GET',
                    headers: headers,
                };
            },
        }),
        // Get not rejected admissions
        getRejectedAdmissions: build.query({
            query: () => {
                const headers = getAuthorizationHeader();
                console.log("Request headers:", headers);
                return {
                    url: '/api/admission/status/rejected',
                    method: 'GET',
                    headers: headers,
                };
            },
        }),

        // Get approved admissions
        getApprovedAdmissions: build.query({
            query: () => ({
                url: '/api/admission/status/approved',
                method: 'GET',
                headers: getAuthorizationHeader(),
            }),
        }),

        // Insert roll number
        insertRollNumber: build.mutation({
            query: ({ admissionId, rollNumber }) => ({
                url: `/api/admission/${admissionId}/roll-number`,
                method: 'POST',
                headers: getAuthorizationHeader(),
                body: { roll_number: rollNumber },
            }),
            invalidatesTags: ['admission','admissionById'],

        }),

        // Insert registration number
        insertRegistrationNumber: build.mutation({
            query: ({ admissionId, registrationNumber }) => ({
                url: `/api/admission/${admissionId}/registration-number`,
                method: 'POST',
                headers: getAuthorizationHeader(),
                body: { registration_number: registrationNumber },
            }),
            invalidatesTags: ['admission','admissionById'],

        }),

        // Verify student
        verifyStudent: build.mutation({
            query: (registrationNumber) => ({
                url: '/api/admission/verify-student',
                method: 'POST',
                headers: getAuthorizationHeader(),
                body: { registration_number: registrationNumber },
            }),
            invalidatesTags: ['admission','admissionById'],

        }),

        // Upload result and certificate
        uploadResultCertificate: build.mutation({
            query: ({ admissionId, formData }) => {
                const authToken = localStorage.getItem("authToken");

                const headers = {
                    Accept: 'application/json',
                };

                if (authToken) {
                    headers.Authorization = `Bearer ${authToken}`;
                }

                return {
                    url: `/api/admission/${admissionId}/upload-result-certificate`,
                    method: 'POST',
                    headers,
                    body: formData, // send FormData directly
                };
            },
            invalidatesTags: ['admission', 'admissionById'],
        }),

        // Update admission
        updateAdmission: build.mutation({
            query: ({ admissionId, formData }) => ({
                url: `/api/admission/${admissionId}/update`,
                method: 'POST',
                headers: formData instanceof FormData
                    ? getFormDataAuthorizationHeader()
                    : getAuthorizationHeader(),
                body: formData,
            }),
            invalidatesTags: ['admission','admissionById'],
        }),
        // Reject admission
        rejectAdmission: build.mutation({
            query: (admissionId) => ({
                url: `/api/admission/${admissionId}/reject`,
                method: 'POST',
                headers: getAuthorizationHeader(),
            }),
            invalidatesTags: ['admission','admissionById'],
        }),
        // Get admission by ID
        getAdmissionById: build.query({
            query: (id) => ({
                url: `/api/admission/${id}`,
                method: 'GET',
                headers: getAuthorizationHeader(),
            }),
            providesTags: ['admissionById'],

        }),
}),
});

export const {
    useCreateAdmissionMutation,
    useUpdateAdmissionMutation,
    useApproveAdmissionMutation,
    useRejectAdmissionMutation,
    useGetNotApprovedAdmissionsQuery,
    useGetAdmissionByIdQuery,
    useGetApprovedAdmissionsQuery,
    useGetRejectedAdmissionsQuery,
    useInsertRollNumberMutation,
    useInsertRegistrationNumberMutation,
    useVerifyStudentMutation,
    useUploadResultCertificateMutation,
} = admissionsApi;