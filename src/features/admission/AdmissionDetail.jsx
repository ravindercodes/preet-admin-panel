import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Badge, Modal, Alert } from 'react-bootstrap';
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

    const { data: admission, isLoading, error } = useGetAdmissionByIdQuery(id, {
        skip: !id,
    });
    // RTK mutation hooks for updating, approving admission, adding roll/registration numbers, and uploading documents
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
    const [uploadType, setUploadType] = useState(''); // 'result' or 'marksheet'
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    // Update form data when admission data is available
    useEffect(() => {
        if (admission?.data) {
            setFormData(admission?.data);
            // Initialize college value if admission_collage exists
            if (admission?.data?.admission_collage) {
                setCollege(admission?.data?.admission_collage);
            }
            // Initialize roll number if it exists
            if (admission?.data?.roll_number) {
                setRollNumber(admission?.data?.roll_number);
            }
            // Initialize registration number if it exists
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
            // Navigate back to admissions page
            navigate('/admission');
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
            // Navigate back to admissions page
            navigate('/admission');
        } catch (error) {
            console.error('Failed to reject admission:', error);
            toast(error?.error?.data?.message || 'Failed to reject admission. Please try again.', { type: 'error' });
            setShowRejectModal(false);
        }
    };

    // Handle roll number modal
    const handleRollNumberClick = () => {
        // Pre-populate with existing roll number if it exists
        if (formData.roll_number) {
            setRollNumber(formData.roll_number);
        } else {
            setRollNumber('');
        }
        setShowRollNumberModal(true);
    };

    // Handle registration number modal
    const handleRegistrationNumberClick = () => {
        // Pre-populate with existing registration number if it exists
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
            // Create FormData object for the update
            const formDataObj = new FormData();
            formDataObj.append('roll_number', rollNumber);

            // Use updateAdmission instead of insertRollNumber to handle both add and edit
            await updateAdmission({ admissionId: id, formData: formDataObj }).unwrap();
            setShowRollNumberModal(false);
            toast(`Roll number ${formData.roll_number ? 'updated' : 'added'} successfully!`, { type: 'success' });

            // Update local state
            setFormData(prev => ({ ...prev, roll_number: rollNumber }));
            setRollNumber(''); // Reset the input
        } catch (error) {
            console.error('Failed to update roll number:', error);
            toast(error?.data?.message || `Failed to ${formData.roll_number ? 'update' : 'add'} roll number. Please try again.`, { type: 'error' });
        }
    };

    // Handle registration number submission
    const handleRegistrationNumberSubmit = async () => {
        if (!registrationNumber.trim()) {
            toast('Please enter a registration number', { type: 'error' });
            return;
        }

        try {
            // Create FormData object for the update
            const formDataObj = new FormData();
            formDataObj.append('registration_number', registrationNumber);

            // Use updateAdmission instead of insertRegistrationNumber to handle both add and edit
            await updateAdmission({ admissionId: id, formData: formDataObj }).unwrap();
            setShowRegistrationNumberModal(false);
            toast(`Registration number ${formData.registration_number ? 'updated' : 'added'} successfully!`, { type: 'success' });

            // Update local state
            setFormData(prev => ({ ...prev, registration_number: registrationNumber }));
            setRegistrationNumber(''); // Reset the input
        } catch (error) {
            console.error('Failed to update registration number:', error);
            toast(error?.data?.message || `Failed to ${formData.registration_number ? 'update' : 'add'} registration number. Please try again.`, { type: 'error' });
        }
    };

    // Handle college modal
    const handleCollegeClick = () => {
        // Pre-populate with existing college name if it exists
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

            // Update local state
            setFormData(prev => ({ ...prev, admission_collage: college }));
            setCollege('');
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

    // Handle file upload
    const handleFileUpload = async () => {
        if (!uploadFile) {
            toast('Please select a file to upload', { type: 'error' });
            return;
        }

        try {
            const formData = new FormData();
            // Use the correct field name based on upload type
            if (uploadType === 'result') {
                formData.append('result_certificate', uploadFile);
            } else if (uploadType === 'marksheet') {
                formData.append('mark_sheet', uploadFile);
            }

            console.log('Uploading file:', uploadFile.name, 'Type:', uploadType);
            console.log('FormData entries:', [...formData.entries()].map(entry => `${entry[0]}: ${entry[1] instanceof File ? entry[1].name : entry[1]}`));

            const response = await uploadResultCertificate({ admissionId: id, formData }).unwrap();
            console.log('Upload response:', response);

            setShowUploadModal(false);
            toast(`${uploadType === 'result' ? 'Result Certificate' : 'Mark Sheet'} uploaded successfully!`, { type: 'success' });

            // Update local state based on upload type
            if (uploadType === 'result') {
                setFormData(prev => ({ ...prev, result_certificate: uploadFile.name }));
            } else if (uploadType === 'marksheet') {
                setFormData(prev => ({ ...prev, mark_sheet: uploadFile.name }));
            }

            // Reset state
            setUploadFile(null);
            setUploadProgress(0);
        } catch (error) {
            console.error('Failed to upload file:', error);
            toast(error?.error?.data?.message || `Failed to upload ${uploadType === 'result' ? 'Result Certificate' : 'Mark Sheet'}. Please try again.`, { type: 'error' });
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

            // Log the form data for debugging
            console.log('Submitting form data:', {
                id,
                ...formData,
                formDataEntries: [...formDataObj.entries()].map(([key, value]) => `${key}: ${value}`)
            });

            // Call the update mutation
            const response = await updateAdmission({ admissionId: id, formData: formDataObj }).unwrap();

            // Exit edit mode after successful update
            setIsEditMode(false);

            // Show success message
            toast(response?.message || 'Admission record updated successfully!', { type: 'success' });

        } catch (error) {
            console.error('Failed to update admission:', error);
            const errorMessage = error?.data?.message || 'Failed to update admission. Please try again.';
            toast(errorMessage, { type: 'error' });
        }
    };

    // Loading and error states are handled above

    return (
        <Container className="mt-4">
            {/* Confirmation Modal */}
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
                        Upload {uploadType === 'result' ? 'Result Certificate' : 'Mark Sheet'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Select {uploadType === 'result' ? 'Result Certificate' : 'Mark Sheet'} File
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
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Student Details</h3>
                        {formData?.status === "approved" ?
                            <Badge bg="success" className="ms-2">Approved</Badge> :
                            <Badge bg="warning" className="ms-2">Not Approved</Badge>
                        }
                    </div>
                    <div className="d-flex gap-2">
                        {!formData?.status === "approved" && (
                            <>
                                <Button
                                    variant="success"
                                    onClick={handleApproveClick}
                                    disabled={isApproving}
                                    className="me-2"
                                >
                                    {isApproving ? 'Approving...' : 'Approve Admission'}
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={handleRejectClick}
                                    disabled={isRejecting}
                                    className="me-2"
                                >
                                    {isRejecting ? 'Rejecting...' : 'Reject Admission'}
                                </Button>
                            </>
                        )}

                        {/* Roll Number Button - only show if approved */}
                        {formData?.status === "approved" && (
                            <Button
                                variant="primary"
                                onClick={handleRollNumberClick}
                                className="me-2"
                            >
                                {formData.roll_number ? 'Edit' : 'Add'} Roll Number
                            </Button>
                        )}

                        {/* Registration Number Button - only show if approved */}
                        {formData?.status === "approved" && (
                            <Button
                                variant="primary"
                                onClick={handleRegistrationNumberClick}
                                className="me-2"
                            >
                                {formData.registration_number ? 'Edit' : 'Add'} Registration Number
                            </Button>
                        )}

                        {/* Add/Edit College Button - hide if not in edit mode and college already exists */}
                        {(isEditMode || !formData.admission_collage) && (
                            <Button
                                variant="primary"
                                onClick={handleCollegeClick}
                                className="me-2"
                            >
                                {formData.admission_collage ? 'Edit' : 'Add'} College
                            </Button>
                        )}
                        <Button
                            variant={isEditMode ? "secondary" : "primary"}
                            onClick={toggleEditMode}
                        >
                            {isEditMode ? "Cancel" : "Edit"}
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
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
                                    <Form.Label>Father's Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="father_name"
                                        value={formData.father_name || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mother's Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mother_name"
                                        value={formData.mother_name || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formData.dob || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
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
                            <Col md={6}>
                                {/* Empty column for alignment */}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={formData.address || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobile1"
                                        value={formData.mobile1 || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
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
                                    <Form.Label>Class Wish</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="class_wish"
                                        value={formData.class_wish || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lower Class Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lower_class_name"
                                        value={formData.lower_class_name || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Subjects</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subjects"
                                        value={formData.subjects || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preferred College</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="preferred_college"
                                        value={formData.preferred_college || ''}
                                        onChange={handleChange}
                                        disabled={!isEditMode}
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
                                <h5>Documents</h5>
                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    {/* Common base path for all files */}
                                    {(() => {
                                        const BASE_STORAGE_PATH = 'https://preet-api.elevencoder.com/storage/app/public/';

                                        return (
                                            <>
                                                {/* View Document Buttons */}
                                                {formData.result_certificate && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.result_certificate}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View Result Certificate</span>
                                                        </Button>
                                                        {isEditMode && (
                                                            <Button
                                                                variant="outline-primary"
                                                                className="d-flex align-items-center"
                                                                onClick={() => handleUploadClick('result')}
                                                                disabled={isUploading}
                                                            >
                                                                <span>Update</span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}

                                                {formData.mark_sheet && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.mark_sheet}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View Mark Sheet</span>
                                                        </Button>
                                                        {isEditMode && (
                                                            <Button
                                                                variant="outline-primary"
                                                                className="d-flex align-items-center"
                                                                onClick={() => handleUploadClick('marksheet')}
                                                                disabled={isUploading}
                                                            >
                                                                <span>Update</span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}

                                                {formData.graduation_certificate && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.graduation_certificate}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View Graduation Certificate</span>
                                                        </Button>
                                                        {isEditMode && (
                                                            <Button
                                                                variant="outline-primary"
                                                                className="d-flex align-items-center"
                                                                onClick={() => handleUploadClick('graduation')}
                                                                disabled={isUploading}
                                                            >
                                                                <span>Update</span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}

                                                {formData.other_document && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.other_document}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View Other Document</span>
                                                        </Button>
                                                        {isEditMode && (
                                                            <Button
                                                                variant="outline-primary"
                                                                className="d-flex align-items-center"
                                                                onClick={() => handleUploadClick('other')}
                                                                disabled={isUploading}
                                                            >
                                                                <span>Update</span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}

                                                {formData.marksheet_10 && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.marksheet_10}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View 10th Marksheet</span>
                                                        </Button>
                                                    </div>
                                                )}

                                                {formData.marksheet_12 && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.marksheet_12}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View 12th Marksheet</span>
                                                        </Button>
                                                    </div>
                                                )}

                                                {formData.aadhar_card && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.aadhar_card}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View Aadhar Card</span>
                                                        </Button>
                                                    </div>
                                                )}

                                                {formData.passport_photo && (
                                                    <div className="d-flex gap-2 mb-2">
                                                        <Button
                                                            variant="outline-secondary"
                                                            className="d-flex align-items-center gap-2"
                                                            onClick={() => window.open(`${BASE_STORAGE_PATH}${formData.passport_photo}`, '_blank')}
                                                        >
                                                            <span>{DocumentSvg}</span>
                                                            <span>View Passport Photo</span>
                                                        </Button>
                                                    </div>
                                                )}

                                                {/* Upload Document Buttons - only show if approved */}
                                                {formData?.status === "approved" && (
                                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                                        {!formData.result_certificate && (
                                                            <Button
                                                                variant="outline-success"
                                                                className="d-flex align-items-center gap-2"
                                                                onClick={() => handleUploadClick('result')}
                                                                disabled={isUploading}
                                                            >
                                                                <span>{PlusSvg}</span>
                                                                <span>Upload Result Certificate</span>
                                                            </Button>
                                                        )}
                                                        {!formData.mark_sheet && (
                                                            <Button
                                                                variant="outline-success"
                                                                className="d-flex align-items-center gap-2"
                                                                onClick={() => handleUploadClick('marksheet')}
                                                                disabled={isUploading}
                                                            >
                                                                <span>{PlusSvg}</span>
                                                                <span>Upload Mark Sheet</span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}

                                                {!formData.result_certificate && !formData.mark_sheet && !formData.graduation_certificate && !formData.other_document && !formData.marksheet_10 && !formData.marksheet_12 && !formData.aadhar_card && !formData.passport_photo && (
                                                    <p className="text-muted">No documents available</p>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </Col>
                        </Row>

                        {isEditMode && (
                            <div className="d-flex justify-content-end mt-3">
                                <Button variant="primary" type="submit" disabled={isUpdating}>
                                    {isUpdating ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdmissionDetail;