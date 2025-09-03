# Preet Institute API Documentation

This document provides comprehensive information about the implemented APIs for the Preet Institute project.

## 🚀 Quick Start

### Environment Setup
Make sure your `.env` file is configured with the correct API URL:
```bash
VITE_BASE_URL=https://preet-api.elevencoder.com
```

### Import APIs
```javascript
import { useAuth, useAdmissions, useContacts } from './hooks/useApi';
```

## 📚 API Categories

### 1. Authentication APIs

#### Login
```javascript
import { useAuth } from './hooks/useApi';

const { login, loginState } = useAuth();

const handleLogin = async () => {
  try {
    const result = await login({
      email: 'admin@test.com',
      password: 'admin@123'
    });
    console.log('Login successful:', result);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

#### Register
```javascript
const { register, registerState } = useAuth();

const handleRegister = async () => {
  try {
    const result = await register({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'admin@123',
      c_password: 'admin@123'
    });
    console.log('Registration successful:', result);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### 2. Contact APIs

#### Create Contact
```javascript
import { useAdmissions } from './hooks/useApi';
import { createAdmissionFormData } from './utils/apiUtils';

const { createAdmission, createState } = useAdmissions();

const handleAdmissionSubmit = async (admissionData) => {
  try {
    const formData = createAdmissionFormData(admissionData);
    const result = await createAdmission(formData);
    console.log('Contact created:', result);
  } catch (error) {
    console.error('Contact creation failed:', error);
  }
};
```

#### Get Admissions
```javascript
import { useGetNotApprovedAdmissionsQuery, useGetApprovedAdmissionsQuery } from './app/api/admissionApi';

// Get not approved admissions
const { data: notApproved, isLoading, error } = useGetNotApprovedAdmissionsQuery();

// Get approved admissions
const { data: approved, isLoading: approvedLoading } = useGetApprovedAdmissionsQuery();
```

#### Approve Contact
```javascript
const { approveAdmission, approveState } = useAdmissions();

const handleApprove = async (admissionId) => {
  try {
    await approveAdmission(admissionId);
    console.log('Contact approved successfully');
  } catch (error) {
    console.error('Approval failed:', error);
  }
};
```

#### Insert Roll Number
```javascript
const { insertRollNumber, rollNumberState } = useAdmissions();

const handleInsertRollNumber = async (admissionId, rollNumber) => {
  try {
    await insertRollNumber({ admissionId, rollNumber });
    console.log('Roll number inserted successfully');
  } catch (error) {
    console.error('Roll number insertion failed:', error);
  }
};
```

#### Insert Registration Number
```javascript
const { insertRegistrationNumber, regNumberState } = useAdmissions();

const handleInsertRegNumber = async (admissionId, registrationNumber) => {
  try {
    await insertRegistrationNumber({ admissionId, registrationNumber });
    console.log('Registration number inserted successfully');
  } catch (error) {
    console.error('Registration number insertion failed:', error);
  }
};
```

#### Verify Student
```javascript
const { verifyStudent, verifyState } = useAdmissions();

const handleVerifyStudent = async (registrationNumber) => {
  try {
    const result = await verifyStudent(registrationNumber);
    console.log('Student verified:', result);
  } catch (error) {
    console.error('Student verification failed:', error);
  }
};
```

#### Upload Result Certificate
```javascript
import { createResultCertificateFormData } from './utils/apiUtils';

const { uploadResultCertificate, uploadState } = useAdmissions();

const handleUploadCertificate = async (admissionId, resultCertificate, markSheet) => {
  try {
    const formData = createResultCertificateFormData(resultCertificate, markSheet);
    await uploadResultCertificate({ admissionId, formData });
    console.log('Certificate uploaded successfully');
  } catch (error) {
    console.error('Certificate upload failed:', error);
  }
};
```

### 3. Contact APIs

#### Send Contact Message
```javascript
import { useContacts } from './hooks/useApi';

const { sendContactMessage, sendState } = useContacts();

const handleSendMessage = async (messageData) => {
  try {
    await sendContactMessage({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      course: 'Computer Science',
      message: 'I would like to know more about the course.'
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Message sending failed:', error);
  }
};
```

#### Get Contact Messages
```javascript
import { useGetContactMessagesQuery, useGetUnreadContactsQuery, useGetReadContactsQuery } from './app/api/contactApi';

// Get all contact messages
const { data: contacts, isLoading } = useGetContactMessagesQuery();

// Get unread contacts
const { data: unreadContacts } = useGetUnreadContactsQuery();

// Get read contacts
const { data: readContacts } = useGetReadContactsQuery();
```

#### Mark Contact as Read
```javascript
const { markAsRead, markReadState } = useContacts();

const handleMarkAsRead = async (contactId) => {
  try {
    await markAsRead(contactId);
    console.log('Contact marked as read');
  } catch (error) {
    console.error('Failed to mark as read:', error);
  }
};
```

## 🛠️ Utility Functions

### Form Data Creation
```javascript
import { createAdmissionFormData, createResultCertificateFormData } from './utils/apiUtils';

// For admission form
const formData = createAdmissionFormData({
  name: 'John Doe',
  father_name: 'Richard Doe',
  // ... other fields
  marksheet_10: fileObject, // File object
  // ... other files
});

// For result certificate
const certificateFormData = createResultCertificateFormData(
  resultCertificateFile,
  markSheetFile
);
```

### File URL Generation
```javascript
import { getFileUrl } from './utils/apiUtils';

const fileUrl = getFileUrl('storage/app/public/admissions/filename.pdf');
// Returns: https://preet-api.elevencoder.com/storage/app/public/admissions/filename.pdf
```

### Error Handling
```javascript
import { handleApiError } from './utils/apiUtils';

try {
  // API call
} catch (error) {
  const formattedError = handleApiError(error);
  console.log(formattedError.message);
  console.log(formattedError.status);
  console.log(formattedError.errors);
}
```

### Form Validation
```javascript
import { validateAdmissionData } from './utils/apiUtils';

const validation = validateAdmissionData(formData);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
  return;
}
```

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── authApi.js          # Authentication APIs
│   │   ├── admissionApi.js     # Contact APIs
│   │   ├── contactApi.js       # Contact APIs
│   │   └── index.js            # Export all APIs
│   ├── dmApi.js                # Main API configuration
│   └── store.js                # Redux store
├── hooks/
│   └── useApi.js               # Custom API hooks
├── utils/
│   └── apiUtils.js             # API utility functions
└── components/
    └── examples/
        └── AdmissionForm.jsx   # Example admission form
```

## 🔧 Configuration

### Environment Variables
```bash
# Development
VITE_BASE_URL=https://preet-api.elevencoder.com

# Production
VITE_BASE_URL=https://api-prod.offthetreesnacks.com
```

### Running Different Environments
```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Build for development
npm run build:dev

# Build for production
npm run build:prod
```

## 🎯 Features

- ✅ **RTK Query Integration**: Automatic caching and state management
- ✅ **Error Handling**: Consistent error messages and handling
- ✅ **Loading States**: Built-in loading indicators
- ✅ **File Uploads**: Support for FormData and file uploads
- ✅ **Form Validation**: Client-side validation utilities
- ✅ **Toast Notifications**: Success/error notifications
- ✅ **Type Safety**: JSDoc comments for better IntelliSense
- ✅ **Environment Support**: Multiple environment configurations

## 🚨 Error Handling

All APIs include automatic error handling with:
- Toast notifications for user feedback
- Consistent error message formatting
- Error logging for debugging
- Graceful fallbacks

## 📝 Example Usage

See `src/components/examples/AdmissionForm.jsx` for a complete example of how to use the admission APIs with form handling, validation, and file uploads.

## 🔄 Caching

RTK Query automatically caches API responses. You can:
- Invalidate cache when needed
- Refetch data automatically
- Optimize performance with background updates

## 🎉 Getting Started

1. Ensure your environment variables are set
2. Import the required hooks
3. Use the APIs in your components
4. Handle loading and error states
5. Enjoy automatic caching and state management!

For more detailed examples, check the example components and utility functions.


