import {dmApi} from "@/app/dmApi";
import {getAuthorizationHeader} from "@/helpers/RtkQueryUtils";

export const contactsApi = dmApi.injectEndpoints({
    endpoints: (build) => ({
        approveAdmission: build.mutation({
            query: (admissionId) => ({
                url: `/api/admission/${admissionId}/approve`,
                method: 'POST',
                headers: getAuthorizationHeader(),
            }),
        }),

        // Get not approved admissions
        getNotApprovedAdmissions: build.query({
            query: () => {
                const headers = getAuthorizationHeader();
                console.log("Request headers:", headers);
                return {
                    url: '/api/admission/not-approved',
                    method: 'GET',
                    headers: headers,
                };
            },
        }),

        // Get approved admissions
        getApprovedAdmissions: build.query({
            query: () => ({
                url: '/api/admission/approved',
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
        }),

        // Insert registration number
        insertRegistrationNumber: build.mutation({
            query: ({ admissionId, registrationNumber }) => ({
                url: `/api/admission/${admissionId}/registration-number`,
                method: 'POST',
                headers: getAuthorizationHeader(),
                body: { registration_number: registrationNumber },
            }),
        }),

        // Verify student
        verifyStudent: build.mutation({
            query: (registrationNumber) => ({
                url: '/api/admission/verify-student',
                method: 'POST',
                headers: getAuthorizationHeader(),
                body: { registration_number: registrationNumber },
            }),
        }),

        // Upload result and certificate
        uploadResultCertificate: build.mutation({
            query: ({ admissionId, formData }) => ({
                url: `/api/admission/${admissionId}/upload-result-certificate`,
                method: 'POST',
                headers: getAuthorizationHeader(),
                body: formData, // FormData for file uploads
            }),
        }),
    }),
});

export const {
    useCreateAdmissionMutation,
    useApproveAdmissionMutation,
    useGetNotApprovedAdmissionsQuery,
    useGetApprovedAdmissionsQuery,
    useInsertRollNumberMutation,
    useInsertRegistrationNumberMutation,
    useVerifyStudentMutation,
    useUploadResultCertificateMutation,
} = contactsApi;