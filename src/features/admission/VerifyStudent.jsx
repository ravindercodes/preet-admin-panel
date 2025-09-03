import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useVerifyStudentMutation } from './admissionsApi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from "@/components/shared/modalContent/ConfirmationModal";

const VerifyStudent = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [error, setError] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const navigate = useNavigate();
    
    // RTK Query hook for verifying student
    const [verifyStudent, { isLoading }] = useVerifyStudentMutation();
    
    // Handle form input change
    const handleChange = (e) => {
        setRegistrationNumber(e.target.value);
        // Clear previous results when input changes
        setVerificationResult(null);
        setError('');
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!registrationNumber.trim()) {
            setError('Please enter a registration number');
            return;
        }
        
        // Show confirmation modal instead of immediately verifying
        setShowConfirmModal(true);
    };
    
    // Handle confirm verification
    const handleConfirmVerification = async () => {
        try {
            const result = await verifyStudent(registrationNumber).unwrap();
            setVerificationResult(result);
            setError('');
        } catch (err) {
            console.error('Failed to verify student:', err);
            setError('Student verification failed. Please check the registration number and try again.');
            setVerificationResult(null);
        } finally {
            setShowConfirmModal(false);
        }
    };
    
    // Handle navigation to student details
    const handleViewDetails = () => {
        if (verificationResult && verificationResult.id) {
            navigate(`/admission/${verificationResult.id}`);
        }
    };
    
    return (
        <Container className="py-4">
            <ConfirmationModal
                show={showConfirmModal}
                setShow={setShowConfirmModal}
                title="Verify Student"
                message="Are you sure you want to verify this student with the provided registration number?"
                onConfirm={handleConfirmVerification}
                confirmButtonText="Verify"
                confirmButtonVariant="primary"
            />
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Header as="h5" style={{ backgroundColor: '#3f51b5', color: 'white' }}>
                            Verify Student
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Registration Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={registrationNumber}
                                        onChange={handleChange}
                                        placeholder="Enter registration number"
                                        disabled={isLoading}
                                    />
                                    <Form.Text className="text-muted">
                                        Enter the student's registration number to verify their admission status.
                                    </Form.Text>
                                </Form.Group>
                                
                                <Button 
                                    style={{ backgroundColor: '#3f51b5', borderColor: '#3f51b5' }} 
                                    type="submit"
                                    disabled={isLoading || !registrationNumber.trim()}
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Student'}
                                </Button>
                            </Form>
                            
                            {error && (
                                <Alert variant="danger" className="mt-3">
                                    {error}
                                </Alert>
                            )}
                            
                            {verificationResult && (
                                <Card className="mt-4">
                                    <Card.Header as="h6" style={{ backgroundColor: '#4caf50', color: 'white' }}>
                                        Verification Successful
                                    </Card.Header>
                                    <Card.Body>
                                        <p><strong>Name:</strong> {verificationResult.name}</p>
                                        <p><strong>Father's Name:</strong> {verificationResult.father_name}</p>
                                        <p><strong>Class:</strong> {verificationResult.class_wish}</p>
                                        <p><strong>Registration Number:</strong> {verificationResult.registration_number}</p>
                                        <p><strong>Roll Number:</strong> {verificationResult.roll_number || 'Not assigned'}</p>
                                        <p><strong>Status:</strong> {verificationResult.is_approved ? 'Approved' : 'Not Approved'}</p>
                                        
                                        <Button 
                                            style={{ backgroundColor: '#3f51b5', borderColor: '#3f51b5' }} 
                                            onClick={handleViewDetails}
                                            className="mt-2"
                                        >
                                            View Full Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VerifyStudent;