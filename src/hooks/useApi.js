import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { handleApiError } from '@/utils/apiUtils';

/**
 * Custom hook for handling API mutations with error handling
 * @param {Function} mutationHook - RTK Query mutation hook
 * @param {Object} options - Options for error handling
 * @returns {Object} Enhanced mutation with error handling
 */
export const useApiMutation = (mutationHook, options = {}) => {
  const [mutate, mutationState] = mutationHook();
  
  const { 
    onSuccess, 
    onError, 
    successMessage = 'Operation completed successfully',
    errorMessage = 'Operation failed'
  } = options;

  const executeMutation = useCallback(async (data) => {
    try {
      const result = await mutate(data).unwrap();
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      const formattedError = handleApiError(error);
      
      if (errorMessage) {
        toast.error(formattedError.message || errorMessage);
      }
      
      if (onError) {
        onError(formattedError);
      }
      
      throw formattedError;
    }
  }, [mutate, onSuccess, onError, successMessage, errorMessage]);

  return [executeMutation, mutationState];
};

/**
 * Custom hook for handling API queries with error handling
 * @param {Function} queryHook - RTK Query query hook
 * @param {Object} options - Options for error handling
 * @returns {Object} Enhanced query with error handling
 */
export const useApiQuery = (queryHook, options = {}) => {
  const queryResult = queryHook();
  
  const { onError, errorMessage = 'Failed to fetch data' } = options;

  // Handle errors
  if (queryResult.error && !queryResult.isLoading) {
    const formattedError = handleApiError(queryResult.error);
    
    if (errorMessage) {
      toast.error(formattedError.message || errorMessage);
    }
    
    if (onError) {
      onError(formattedError);
    }
  }

  return queryResult;
};

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
  const [login, loginState] = useApiMutation(
    () => import('../app/api/authApi').then(m => m.useLoginMutation()),
    {
      successMessage: 'Login successful',
      errorMessage: 'Login failed'
    }
  );

  const [register, registerState] = useApiMutation(
    () => import('../app/api/authApi').then(m => m.useRegisterMutation()),
    {
      successMessage: 'Registration successful',
      errorMessage: 'Registration failed'
    }
  );

  return {
    login,
    register,
    loginState,
    registerState
  };
};

/**
 * Custom hook for admission operations
 */
export const useAdmissions = () => {
  const [updateAdmission, updateState] = useApiMutation(
    () => import('../features/admission/admissionsApi').then(m => m.useUpdateAdmissionMutation()),
    {
      successMessage: 'Admission updated successfully',
      errorMessage: 'Failed to update admission'
    }
  );

  const [approveAdmission, approveState] = useApiMutation(
    () => import('../features/admission/admissionsApi').then(m => m.useApproveAdmissionMutation()),
    {
      successMessage: 'Contact approved successfully',
      errorMessage: 'Failed to approve admission'
    }
  );

  const [insertRollNumber, rollNumberState] = useApiMutation(
    () => import('../features/admission/admissionsApi').then(m => m.useInsertRollNumberMutation()),
    {
      successMessage: 'Roll number added successfully',
      errorMessage: 'Failed to add roll number'
    }
  );

  const [insertRegistrationNumber, regNumberState] = useApiMutation(
    () => import('../features/admission/admissionsApi').then(m => m.useInsertRegistrationNumberMutation()),
    {
      successMessage: 'Registration number added successfully',
      errorMessage: 'Failed to add registration number'
    }
  );

  const [verifyStudent, verifyState] = useApiMutation(
    () => import('../features/admission/admissionsApi').then(m => m.useVerifyStudentMutation()),
    {
      successMessage: 'Student verified successfully',
      errorMessage: 'Failed to verify student'
    }
  );

  const [uploadResultCertificate, uploadState] = useApiMutation(
    () => import('../app/api/admissionApi').then(m => m.useUploadResultCertificateMutation()),
    {
      successMessage: 'Certificate uploaded successfully',
      errorMessage: 'Failed to upload certificate'
    }
  );

  return {
    updateAdmission,
    approveAdmission,
    insertRollNumber,
    insertRegistrationNumber,
    verifyStudent,
    uploadResultCertificate,
    updateState,
    approveState,
    rollNumberState,
    regNumberState,
    verifyState,
    uploadState
  };
};

/**
 * Custom hook for contact operations
 */
export const useContacts = () => {
  const [sendContactMessage, sendState] = useApiMutation(
    () => import('../app/api/contactApi').then(m => m.useSendContactMessageMutation()),
    {
      successMessage: 'Message sent successfully',
      errorMessage: 'Failed to send message'
    }
  );

  const [markAsRead, markReadState] = useApiMutation(
    () => import('../app/api/contactApi').then(m => m.useMarkContactAsReadMutation()),
    {
      successMessage: 'Message marked as read',
      errorMessage: 'Failed to mark message as read'
    }
  );

  return {
    sendContactMessage,
    markAsRead,
    sendState,
    markReadState
  };
};


