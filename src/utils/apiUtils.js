/**
 * Utility functions for API operations
 */

/**
 * Create FormData for admission submission
 * @param {Object} admissionData - Contact form data
 * @returns {FormData} FormData object
 */
export const createAdmissionFormData = (admissionData) => {
  const formData = new FormData();
  
  // Add text fields
  const textFields = [
    'name', 'father_name', 'mother_name', 'dob', 'address',
    'mobile1', 'mobile2', 'class_wish', 'lower_class_name',
    'subjects', 'preferred_college', 'caste', 'lower_class_roll_number',
    'reference', 'old_class_record'
  ];
  
  textFields.forEach(field => {
    if (admissionData[field]) {
      formData.append(field, admissionData[field]);
    }
  });
  
  // Add file fields
  const fileFields = [
    'marksheet_10', 'marksheet_12', 'aadhar_card', 'passport_photo',
    'graduation_certificate', 'other_document'
  ];
  
  fileFields.forEach(field => {
    if (admissionData[field] && admissionData[field] instanceof File) {
      formData.append(field, admissionData[field]);
    }
  });
  
  return formData;
};

/**
 * Create FormData for result certificate upload
 * @param {File} resultCertificate - Result certificate file
 * @param {File} markSheet - Mark sheet file
 * @returns {FormData} FormData object
 */
export const createResultCertificateFormData = (resultCertificate, markSheet) => {
  const formData = new FormData();
  
  if (resultCertificate instanceof File) {
    formData.append('result_certificate', resultCertificate);
  }
  
  if (markSheet instanceof File) {
    formData.append('mark_sheet', markSheet);
  }
  
  return formData;
};

/**
 * Get file URL from storage path
 * @param {string} storagePath - Storage path from API response
 * @returns {string} Full URL to access the file
 */
export const getFileUrl = (storagePath) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';
  return `${baseUrl}/${storagePath}`;
};

/**
 * Handle API errors consistently
 * @param {Error} error - Error object from API call
 * @returns {Object} Formatted error object
 */
export const handleApiError = (error) => {
  if (error?.data?.message) {
    return {
      message: error.data.message,
      status: error.status,
      errors: error.data.errors || null
    };
  }
  
  return {
    message: error?.message || 'An unexpected error occurred',
    status: error?.status || 500,
    errors: null
  };
};

/**
 * Validate admission form data
 * @param {Object} data - Contact form data
 * @returns {Object} Validation result with isValid and errors
 */
export const validateAdmissionData = (data) => {
  const errors = {};
  
  // Required fields
  const requiredFields = ['name', 'father_name', 'mother_name', 'dob', 'address', 'mobile1'];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors[field] = `${field.replace('_', ' ')} is required`;
    }
  });
  
  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Mobile number validation
  if (data.mobile1 && !/^\d{10}$/.test(data.mobile1.replace(/\D/g, ''))) {
    errors.mobile1 = 'Mobile number must be 10 digits';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// utils/fileUtils.js or in your component file
export const getFileUrl = (filePath) => {
  if (!filePath) return null;

  // If it's already a full URL, return it as is
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }

  // Remove any leading slashes or storage path prefixes
  const cleanPath = filePath.replace(/^\/?storage\/?/, '').replace(/^app\/public\/?/, '');

  // Construct the full URL
  return `https://preet-api.elevencoder.com/storage/${cleanPath}`;
};


