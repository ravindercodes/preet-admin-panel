// Export all API services
export { authApi, useRegisterMutation, useLoginMutation } from './authApi';
export {  useCreateAdmissionMutation, useApproveAdmissionMutation, useGetNotApprovedAdmissionsQuery, useGetApprovedAdmissionsQuery, useInsertRollNumberMutation, useInsertRegistrationNumberMutation, useVerifyStudentMutation, useUploadResultCertificateMutation } from '../../features/admission/admissionsApi';
export { contactApi, useSendContactMessageMutation, useMarkContactAsReadMutation, useGetContactMessagesQuery, useGetUnreadContactsQuery, useGetReadContactsQuery } from './contactApi';

// Export the main API instance
export { dmApi } from '../dmApi';


