import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Badge, Modal, Alert, Image } from 'react-bootstrap';
import {
  useApproveAdmissionMutation,
  useRejectAdmissionMutation,
  useInsertRollNumberMutation,
  useInsertRegistrationNumberMutation,
  useUploadResultCertificateMutation,
  useUpdateAdmissionMutation,
  useGetAdmissionByIdQuery
} from './admissionsApi';
import { LeftArrowSvg } from '@/svgFiles/LeftArrowSvg';
import ConfirmationModal from '../../components/shared/modalContent/ConfirmationModal';
import { PlusSvg } from '@/svgFiles/PlusSvg';
import { DocumentSvg } from '@/svgFiles/DocumentSvg';
import { toast } from 'react-hot-toast';

const AdmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: admission, isLoading, error, refetch } = useGetAdmissionByIdQuery(id, {
    skip: !id,
  });

  // RTK mutation hooks
  const [updateAdmission, { isLoading: isUpdating }] = useUpdateAdmissionMutation();
  const [approveAdmission, { isLoading: isApproving }] = useApproveAdmissionMutation();
  const [rejectAdmission, { isLoading: isRejecting }] = useRejectAdmissionMutation();
  const [insertRollNumber, { isLoading: isInsertingRollNumber }] = useInsertRollNumberMutation();
  const [insertRegistrationNumber, { isLoading: isInsertingRegistrationNumber }] = useInsertRegistrationNumberMutation();
  const [uploadResultCertificate, { isLoading: isUploading }] = useUploadResultCertificateMutation();

  // State for form data, edit mode, and modals
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRollNumberModal, setShowRollNumberModal] = useState(false);
  const [showRegistrationNumberModal, setShowRegistrationNumberModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCollegeModal, setShowCollegeModal] = useState(false);
  const [rollNumber, setRollNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [college, setCollege] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Update form data when admission data is available
  useEffect(() => {
    if (admission?.data) {
      setFormData(admission?.data);
      if (admission?.data?.admission_collage) {
        setCollege(admission?.data?.admission_collage);
      }
      if (admission?.data?.roll_number) {
        setRollNumber(admission?.data?.roll_number);
      }
      if (admission?.data?.registration_number) {
        setRegistrationNumber(admission?.data?.registration_number);
      }
    }
  }, [admission]);

  // Handle loading and error states
  if (isLoading) {
    return (
      <Container className="py-4">
        <Card>
          <Card.Body className="text-center">
            <h4>Loading admission details...</h4>
            <div className="mt-3">
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">Please wait...</span>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Card>
          <Card.Body className="text-center">
            <h4>Error loading admission data</h4>
            <p className="text-danger">{error?.data?.message || 'An unexpected error occurred'}</p>
            <Button variant="primary" onClick={() => navigate('/admission')}>
              Return to Admissions List
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (!admission) {
    return (
      <Container className="py-4">
        <Card>
          <Card.Body className="text-center">
            <h4>Admission data not available</h4>
            <p>Please return to the admissions list and try again.</p>
            <Button variant="primary" onClick={() => navigate('/admission')}>
              Return to Admissions List
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle back button click
  const handleBack = () => {
    navigate('/admission');
  };

  // Handle approve button click
  const handleApproveClick = () => {
    setShowApproveModal(true);
  };

  // Handle reject button click
  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  // Handle confirm approval
  const handleConfirmApproval = async () => {
    try {
      await approveAdmission(id).unwrap();
      setShowApproveModal(false);
      toast('Admission approved successfully!', { type: 'success' });
      refetch();
    } catch (error) {
      console.error('Failed to approve admission:', error);
      toast(error?.error?.data?.message || 'Failed to approve admission. Please try again.', { type: 'error' });
      setShowApproveModal(false);
    }
  };

  // Handle confirm rejection
  const handleConfirmRejection = async () => {
    try {
      await rejectAdmission(id).unwrap();
      setShowRejectModal(false);
      toast('Admission rejected successfully!', { type: 'success' });
      refetch();
    } catch (error) {
      console.error('Failed to reject admission:', error);
      toast(error?.error?.data?.message || 'Failed to reject admission. Please try again.', { type: 'error' });
      setShowRejectModal(false);
    }
  };

  // Handle roll number modal
  const handleRollNumberClick = () => {
    if (formData.roll_number) {
      setRollNumber(formData.roll_number);
    } else {
      setRollNumber('');
    }
    setShowRollNumberModal(true);
  };

  // Handle registration number modal
  const handleRegistrationNumberClick = () => {
    if (formData.registration_number) {
      setRegistrationNumber(formData.registration_number);
    } else {
      setRegistrationNumber('');
    }
    setShowRegistrationNumberModal(true);
  };

  // Handle roll number submission
  const handleRollNumberSubmit = async () => {
    if (!rollNumber.trim()) {
      toast('Please enter a roll number', { type: 'error' });
      return;
    }

    try {
      await insertRollNumber({
        admissionId: id,
        rollNumber: rollNumber.trim(),
      }).unwrap();

      setShowRollNumberModal(false);
      toast(
        `Roll number ${formData.roll_number ? 'updated' : 'added'} successfully!`,
        { type: 'success' }
      );

      setFormData(prev => ({ ...prev, roll_number: rollNumber }));
      setRollNumber('');
      refetch();
    } catch (error) {
      console.error('Failed to update roll number:', error);
      toast(
        error?.data?.message ||
        `Failed to ${formData.roll_number ? 'update' : 'add'} roll number. Please try again.`,
        { type: 'error' }
      );
    }
  };

  // Handle registration number submission
  const handleRegistrationNumberSubmit = async () => {
    if (!registrationNumber.trim()) {
      toast('Please enter a registration number', { type: 'error' });
      return;
    }

    try {
      await insertRegistrationNumber({
        admissionId: id,
        registrationNumber: registrationNumber.trim(),
      }).unwrap();

      setShowRegistrationNumberModal(false);
      toast(
        `Registration number ${
          formData.registration_number ? 'updated' : 'added'
        } successfully!`,
        { type: 'success' }
      );

      setFormData(prev => ({ ...prev, registration_number: registrationNumber }));
      setRegistrationNumber('');
      refetch();
    } catch (error) {
      console.error('Failed to update registration number:', error);
      toast(
        error?.data?.message ||
        `Failed to ${formData.registration_number ? 'update' : 'add'} registration number. Please try again.`,
        { type: 'error' }
      );
    }
  };

  // Handle college modal
  const handleCollegeClick = () => {
    if (formData.admission_collage) {
      setCollege(formData.admission_collage);
    }
    setShowCollegeModal(true);
  };

  // Handle college submission
  const handleCollegeSubmit = async () => {
    if (!college.trim()) {
      toast('Please enter a college name', { type: 'error' });
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append('admission_collage', college);

      await updateAdmission({ admissionId: id, formData: formDataObj }).unwrap();
      setShowCollegeModal(false);
      toast(`College ${formData.admission_collage ? 'updated' : 'added'} successfully!`, { type: 'success' });

      setFormData(prev => ({ ...prev, admission_collage: college }));
      setCollege('');
      refetch();
    } catch (error) {
      console.error(`Failed to ${formData.admission_collage ? 'update' : 'add'} college:`, error);
      toast(error?.data?.message || `Failed to ${formData.admission_collage ? 'update' : 'add'} college. Please try again.`, { type: 'error' });
    }
  };

  // Handle upload modal open
  const handleUploadClick = (type) => {
    setUploadType(type);
    setShowUploadModal(true);
    setUploadFile(null);
    setUploadProgress(0);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Handle file upload using updateAdmission API
  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast('Please select a file to upload', { type: 'error' });
      return;
    }

    try {
      const formDataObj = new FormData();

      // Determine the field name based on upload type
      let fieldName;
      switch(uploadType) {
        case 'result':
          fieldName = 'result_certificate';
          break;
        case 'marksheet':
          fieldName = 'mark_sheet';
          break;
        case 'graduation':
          fieldName = 'graduation_certificate';
          break;
        case 'other':
          fieldName = 'other_document';
          break;
        case 'passport_photo':
          fieldName = 'passport_photo';
          break;
        default:
          fieldName = uploadType;
      }

      formDataObj.append(fieldName, uploadFile);

      // Use the updateAdmission API for all document uploads
      await updateAdmission({ admissionId: id, formData: formDataObj }).unwrap();

      setShowUploadModal(false);
      toast(`${fieldName.replace('_', ' ')} uploaded successfully!`, { type: 'success' });

      // Refetch the admission data to get updated document URLs
      refetch();

      // Reset state
      setUploadFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Failed to upload file:', error);
      toast(error?.data?.message || `Failed to upload document. Please try again.`, { type: 'error' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are present
    const requiredFields = [
      'name', 'father_name', 'mother_name', 'dob', 'address',
      'mobile1', 'class_wish', 'lower_class_name', 'subjects', 'preferred_college'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast(`Missing required fields: ${missingFields.join(', ')}`, { type: 'error' });
      return;
    }

    try {
      // Create FormData object
      const formDataObj = new FormData();

      // Define file path fields that should be excluded from the update
      const filePathFields = [
        'marksheet_10', 'marksheet_12', 'aadhar_card', 'passport_photo',
        'graduation_certificate', 'other_document', 'result_certificate', 'mark_sheet'
      ];

      // Append all non-file fields to FormData
      Object.keys(formData).forEach(key => {
        // Skip null or undefined values
        if (formData[key] === null || formData[key] === undefined) {
          return;
        }

        // Skip file path fields (these should only be updated via file upload)
        if (filePathFields.includes(key)) {
          return;
        }

        // Append the field to FormData
        formDataObj.append(key, formData[key]);
      });

      // Make sure to include the ID in the form data
      formDataObj.append('id', id);

      // Call the update mutation
      const response = await updateAdmission({ admissionId: id, formData: formDataObj }).unwrap();

      // Exit edit mode after successful update
      setIsEditMode(false);

      // Show success message
      toast(response?.message || 'Admission record updated successfully!', { type: 'success' });
      refetch();

    } catch (error) {
      console.error('Failed to update admission:', error);
      const errorMessage = error?.data?.message || 'Failed to update admission. Please try again.';
      toast(errorMessage, { type: 'error' });
    }
  };

  // Base storage path for documents
  const BASE_STORAGE_PATH = 'https://api.preetinstitute.in/storage/app/public/';

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'warning';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'Pending';
    }
  };

  return (
    <Container className="mt-4">
      {/* Confirmation Modals */}
      <ConfirmationModal
        show={showApproveModal}
        setShow={setShowApproveModal}
        title="Approve Admission"
        message="Are you sure you want to approve this admission? This action cannot be undone."
        onConfirm={handleConfirmApproval}
        confirmButtonText="Approve"
      />

      <ConfirmationModal
        show={showRejectModal}
        setShow={setShowRejectModal}
        title="Reject Admission"
        message="Are you sure you want to reject this admission? This action cannot be undone."
        onConfirm={handleConfirmRejection}
        confirmButtonText="Reject"
        confirmButtonVariant="danger"
      />

      {/* Roll Number Modal */}
      <Modal show={showRollNumberModal} onHide={() => setShowRollNumberModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.roll_number ? 'Edit' : 'Add'} Roll Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Roll Number</Form.Label>
            <Form.Control
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter roll number"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRollNumberModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleRollNumberSubmit}
            disabled={isInsertingRollNumber}
          >
            {isInsertingRollNumber ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Registration Number Modal */}
      <Modal show={showRegistrationNumberModal} onHide={() => setShowRegistrationNumberModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.registration_number ? 'Edit' : 'Add'} Registration Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Registration Number</Form.Label>
            <Form.Control
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter registration number"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegistrationNumberModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleRegistrationNumberSubmit}
            disabled={isInsertingRegistrationNumber}
          >
            {isInsertingRegistrationNumber ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* College Modal */}
      <Modal show={showCollegeModal} onHide={() => setShowCollegeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.admission_collage ? 'Edit' : 'Add'} College</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>College Name</Form.Label>
            <Form.Control
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Enter college name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCollegeModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCollegeSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Upload Document Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Upload {uploadType === 'result' ? 'Result Certificate' :
            uploadType === 'marksheet' ? 'Mark Sheet' :
              uploadType === 'graduation' ? 'Graduation Certificate' :
                uploadType === 'other' ? 'Other Document' :
                  uploadType === 'passport_photo' ? 'Passport Photo' : 'Document'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Select File
            </Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <Form.Text className="text-muted">
              Accepted formats: PDF, JPG, JPEG, PNG
            </Form.Text>
          </Form.Group>

          {uploadFile && (
            <Alert variant="info" className="mt-3">
              Selected file: {uploadFile.name} ({Math.round(uploadFile.size / 1024)} KB)
            </Alert>
          )}

          {uploadProgress > 0 && (
            <div className="mt-3">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleFileUpload}
            disabled={isUploading || !uploadFile}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex align-items-center mb-3">
        <Button
          variant="outline-primary"
          className="me-2 d-flex align-items-center"
          onClick={handleBack}
        >
          <span className="me-1">{LeftArrowSvg}</span> Back
        </Button>
      </div>

      {/* Student Profile Header */}
      <Card className="mb-4 student-profile-header">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <div className="student-photo-container mb-3">
                {formData.passport_photo ? (
                  <Image
                    src={`${BASE_STORAGE_PATH}${formData.passport_photo}`}
                    alt="Student Photo"
                    fluid
                    rounded
                    className="student-photo"
                  />
                ) : (
                  <div className="student-photo-placeholder d-flex align-items-center justify-content-center">
                    <span className="text-muted">No Photo</span>
                  </div>
                )}
              </div>
              {isEditMode && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleUploadClick('passport_photo')}
                  className="w-100"
                >
                  {formData.passport_photo ? 'Change Photo' : 'Upload Photo'}
                </Button>
              )}
            </Col>
            <Col md={9}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="mb-1">{formData.name || 'N/A'}</h2>
                  <p className="text-muted mb-2">{formData.admission_collage || 'College not assigned'}</p>

                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <div>
                      <strong>Roll No:</strong>
                      <span className={formData.roll_number ? 'ms-1' : 'ms-1 text-warning'}>
                                                {formData.roll_number || 'Not assigned'}
                                            </span>
                    </div>
                    <div>
                      <strong>Registration No:</strong>
                      <span className={formData.registration_number ? 'ms-1' : 'ms-1 text-warning'}>
                                                {formData.registration_number || 'Not assigned'}
                                            </span>
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <Badge bg={getStatusBadge(formData?.status)} className="ms-1">
                        {getStatusText(formData?.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3">
                    <div>
                      <strong>Course:</strong> {formData.class_wish || 'N/A'}
                    </div>

                    <div>
                      <strong>DOB:</strong> {formData.dob || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  {formData?.status === "pending" && (
                    <>
                      <Button
                        variant="success"
                        onClick={handleApproveClick}
                        disabled={isApproving}
                        size="sm"
                      >
                        {isApproving ? 'Approving...' : 'Approve'}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={handleRejectClick}
                        disabled={isRejecting}
                        size="sm"
                      >
                        {isRejecting ? 'Rejecting...' : 'Reject'}
                      </Button>
                    </>
                  )}

                  {/* Roll Number Button - only show if approved */}
                  {formData?.status === "approved" && (
                    <Button
                      variant="outline-primary"
                      onClick={handleRollNumberClick}
                      size="sm"
                    >
                      {formData.roll_number ? 'Edit' : 'Add'} Roll No
                    </Button>
                  )}

                  {/* Registration Number Button - only show if approved */}
                  {formData?.status === "approved" && (
                    <Button
                      variant="outline-primary"
                      onClick={handleRegistrationNumberClick}
                      size="sm"
                    >
                      {formData.registration_number ? 'Edit' : 'Add'} Reg No
                    </Button>
                  )}

                  {/* Add/Edit College Button */}
                  {(isEditMode || !formData.admission_collage) && (
                    <Button
                      variant="outline-primary"
                      onClick={handleCollegeClick}
                      size="sm"
                    >
                      {formData.admission_collage ? 'Edit' : 'Add'} College
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Student Details</h4>
          <Button
            variant={isEditMode ? "secondary" : "primary"}
            onClick={toggleEditMode}
            size="sm"
          >
            {isEditMode ? "Cancel Editing" : "Edit Details"}
          </Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Student Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>College Name</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={formData.admission_collage || ''}
                      disabled={true}
                      className="me-2"
                    />
                    {isEditMode && (
                      <Button
                        variant="outline-primary"
                        onClick={handleCollegeClick}
                        size="sm"
                      >
                        {formData.admission_collage ? 'Edit' : 'Add'}
                      </Button>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Father's Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="father_name"
                    value={formData.father_name || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mother's Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="mother_name"
                    value={formData.mother_name || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile 1 *</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile1"
                    value={formData.mobile1 || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile2"
                    value={formData.mobile2 || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class Wish *</Form.Label>
                  <Form.Control
                    type="text"
                    name="class_wish"
                    value={formData.class_wish || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Lower Class Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lower_class_name"
                    value={formData.lower_class_name || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subjects *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subjects"
                    value={
                      // Handle all cases: array, string, or empty
                      formData.subjects
                        ? Array.isArray(formData.subjects)
                          ? formData.subjects.join(', ')
                          : String(formData.subjects).replace(/[\[\]"]/g, '')
                        : ''
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData(prev => ({
                        ...prev,
                        subjects: value
                      }));
                    }}
                    disabled={!isEditMode}
                    required
                    placeholder="Enter subjects separated by commas (e.g., Math, Science, English)"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred College *</Form.Label>
                  <Form.Control
                    type="text"
                    name="preferred_college"
                    value={formData.preferred_college || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Caste</Form.Label>
                  <Form.Control
                    type="text"
                    name="caste"
                    value={formData.caste || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Lower Class Roll Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="lower_class_roll_number"
                    value={formData.lower_class_roll_number || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Roll Number {formData.roll_number ? '' : '(Not Assigned)'}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.roll_number || ''}
                    disabled={true}
                    className={formData.roll_number ? 'bg-light' : 'bg-warning bg-opacity-10'}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Registration Number {formData.registration_number ? '' : '(Not Assigned)'}</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.registration_number || ''}
                    disabled={true}
                    className={formData.registration_number ? 'bg-light' : 'bg-warning bg-opacity-10'}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Reference</Form.Label>
                  <Form.Control
                    type="text"
                    name="reference"
                    value={formData.reference || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Old Class Record</Form.Label>
                  <Form.Control
                    type="text"
                    name="old_class_record"
                    value={formData.old_class_record || ''}
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={12}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Documents</h5>
                  {isEditMode && (
                    <small className="text-muted">Click on documents to manage them</small>
                  )}
                </div>
                <div className="documents-grid">
                  {[
                    {
                      key: 'marksheet_10',
                      label: '10th Marksheet',
                      value: formData.marksheet_10,
                      editable: false
                    },
                    {
                      key: 'marksheet_12',
                      label: '12th Marksheet',
                      value: formData.marksheet_12,
                      editable: false
                    },
                    {
                      key: 'aadhar_card',
                      label: 'Aadhar Card',
                      value: formData.aadhar_card,
                      editable: false
                    },
                    {
                      key: 'passport_photo',
                      label: 'Passport Photo',
                      value: formData.passport_photo,
                      editable: true
                    },
                    {
                      key: 'result_certificate',
                      label: 'Result Certificate',
                      value: formData.result_certificate,
                      editable: true
                    },
                    {
                      key: 'mark_sheet',
                      label: 'Mark Sheet',
                      value: formData.mark_sheet,
                      editable: true
                    },
                    {
                      key: 'graduation_certificate',
                      label: 'Graduation Certificate',
                      value: formData.graduation_certificate,
                      editable: true
                    },
                    {
                      key: 'other_document',
                      label: 'Other Document',
                      value: formData.other_document,
                      editable: true
                    }
                  ].map((doc) => (
                    <div key={doc.key} className="document-card">
                      <div className="document-icon">
                        {DocumentSvg}
                      </div>
                      <div className="document-info">
                        <div className="document-name">{doc.label}</div>
                        <div className={`document-status ${doc.value ? 'uploaded' : 'missing'}`}>
                          {doc.value ? 'Uploaded' : 'Not Uploaded'}
                        </div>
                      </div>
                      <div className="document-actions">
                        {doc.value ? (
                          <>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => window.open(`${BASE_STORAGE_PATH}${doc.value}`, '_blank')}
                            >
                              View
                            </Button>
                            {(isEditMode && doc.editable) && (
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleUploadClick(doc.key)}
                              >
                                Update
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleUploadClick(doc.key)}
                            disabled={!isEditMode && !doc.editable}
                          >
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            {isEditMode && (
              <div className="d-flex justify-content-end mt-4">
                <Button variant="primary" type="submit" disabled={isUpdating} size="lg">
                  {isUpdating ? 'Saving Changes...' : 'Save All Changes'}
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      <style>{`
                .student-profile-header {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border: none;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                }

                .student-photo-container {
                    width: 200px;
                    height: 200px;
                    margin: 0 auto;
                }

                .student-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border: 3px solid #dee2e6;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                }

                .student-photo-placeholder {
                    width: 100%;
                    height: 100%;
                    background-color: #f8f9fa;
                    border: 2px dashed #dee2e6;
                    border-radius: 0.375rem;
                }

                .documents-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1rem;
                }

                .document-card {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border: 1px solid #dee2e6;
                    border-radius: 0.5rem;
                    background-color: #fff;
                    transition: all 0.2s ease;
                }

                .document-card:hover {
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
                    transform: translateY(-2px);
                }

                .document-icon {
                    margin-right: 1rem;
                    color: #6c757d;
                    flex-shrink: 0;
                }

                .document-info {
                    flex-grow: 1;
                }

                .document-name {
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }

                .document-status {
                    font-size: 0.875rem;
                }

                .document-status.uploaded {
                    color: #198754;
                }

                .document-status.missing {
                    color: #dc3545;
                }

                .document-actions {
                    display: flex;
                    gap: 0.5rem;
                    flex-shrink: 0;
                }

                @media (max-width: 768px) {
                    .documents-grid {
                        grid-template-columns: 1fr;
                    }

                    .document-card {
                        flex-direction: column;
                        text-align: center;
                    }

                    .document-icon {
                        margin-right: 0;
                        margin-bottom: 0.5rem;
                    }

                    .document-actions {
                        margin-top: 0.5rem;
                    }
                }
            `}</style>
    </Container>
  );
};

export default AdmissionDetail;
