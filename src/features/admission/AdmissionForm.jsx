import React, { useState } from 'react';
import { useAdmissions } from '@/hooks/useApi';
import { createAdmissionFormData, validateAdmissionData } from '@/utils/apiUtils';

const AdmissionForm = () => {
  const { updateAdmission, updateState } = useAdmissions();
  const [formData, setFormData] = useState({
    name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    address: '',
    mobile1: '',
    mobile2: '',
    class_wish: '',
    lower_class_name: '',
    subjects: '',
    preferred_college: '',
    caste: '',
    lower_class_roll_number: '',
    reference: '',
    old_class_record: ''
  });
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: fileList[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateAdmissionData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      // Create FormData with both text and file data
      const formDataToSend = createAdmissionFormData({
        ...formData,
        ...files
      });

      // Use updateAdmission for both new and existing admissions
      // If it's a new admission, the API will handle it appropriately
      // If it's an existing admission, we'll pass the ID
      const admissionId = formData.id || 'new'; // Use 'new' for new admissions
      await updateAdmission({ admissionId, formData: formDataToSend });
      
      // Reset form on success
      setFormData({
        name: '',
        father_name: '',
        mother_name: '',
        dob: '',
        address: '',
        mobile1: '',
        mobile2: '',
        class_wish: '',
        lower_class_name: '',
        subjects: '',
        preferred_college: '',
        caste: '',
        lower_class_roll_number: '',
        reference: '',
        old_class_record: ''
      });
      setFiles({});
      setErrors({});
    } catch (error) {
      console.error('Admission submission failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Admission Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name *
            </label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.father_name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter father's name"
            />
            {errors.father_name && <p className="text-red-500 text-sm mt-1">{errors.father_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Name *
            </label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.mother_name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter mother's name"
            />
            {errors.mother_name && <p className="text-red-500 text-sm mt-1">{errors.mother_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.dob ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.address ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter complete address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number 1 *
            </label>
            <input
              type="tel"
              name="mobile1"
              value={formData.mobile1}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.mobile1 ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter mobile number"
            />
            {errors.mobile1 && <p className="text-red-500 text-sm mt-1">{errors.mobile1}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number 2
            </label>
            <input
              type="tel"
              name="mobile2"
              value={formData.mobile2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="Enter alternate mobile number"
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Class
            </label>
            <input
              type="text"
              name="class_wish"
              value={formData.class_wish}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="e.g., ADCA, BCA, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Class
            </label>
            <input
              type="text"
              name="lower_class_name"
              value={formData.lower_class_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="e.g., 12th Grade"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects
            </label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="e.g., Math, Science, English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred College
            </label>
            <input
              type="text"
              name="preferred_college"
              value={formData.preferred_college}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="Enter preferred college"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caste
            </label>
            <input
              type="text"
              name="caste"
              value={formData.caste}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="Enter caste"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Class Roll Number
            </label>
            <input
              type="text"
              name="lower_class_roll_number"
              value={formData.lower_class_roll_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="Enter roll number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="Enter reference name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old Class Record
            </label>
            <input
              type="text"
              name="old_class_record"
              value={formData.old_class_record}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
              placeholder="Enter old class record"
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              10th Marksheet
            </label>
            <input
              type="file"
              name="marksheet_10"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              12th Marksheet
            </label>
            <input
              type="file"
              name="marksheet_12"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhar Card
            </label>
            <input
              type="file"
              name="aadhar_card"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passport Photo
            </label>
            <input
              type="file"
              name="passport_photo"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Certificate
            </label>
            <input
              type="file"
              name="graduation_certificate"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Documents
            </label>
            <input
              type="file"
              name="other_document"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={createState.isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createState.isLoading ? 'Submitting...' : 'Submit Contact'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;


