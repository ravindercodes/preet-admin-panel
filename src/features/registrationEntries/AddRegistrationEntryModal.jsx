import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useCreateRegistrationEntryMutation, useUpdateRegistrationEntryMutation } from './registrationEntriesApi';
import { toast } from 'react-hot-toast';

const AddRegistrationEntryModal = ({ show, onHide, entry, admissionId }) => {
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    marks: '',
    mark_sheet: null,
    result_certificate: null
  });

  const [createEntry, { isLoading: isCreating }] = useCreateRegistrationEntryMutation();
  const [updateEntry, { isLoading: isUpdating }] = useUpdateRegistrationEntryMutation();

  // If entry is provided, populate form for editing
  useEffect(() => {
    if (entry) {
      setFormData({
        name: entry.name || '',
        status: 'registration',
        registration_number: entry.registration_number || '',
        marks: entry.marks || '',
        mark_sheet: null,
        result_certificate: null
      });
    } else {
      setFormData({
        name: '',
        registration_number: '',
        marks: '',
        mark_sheet: null,
        result_certificate: null
      });
    }
  }, [entry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataObj.append(key, formData[key]);
        }
      });

      // Add admission ID and status
      formDataObj.append('admission_id', admissionId);
      formDataObj.append('status', "registration");

      if (entry) {
        await updateEntry({ entryId: entry.id, formData: formDataObj }).unwrap();
        toast.success('Registration entry updated successfully');
      } else {
        await createEntry(formDataObj).unwrap();
        toast.success('Registration entry created successfully');
      }

      onHide();
    } catch (error) {
      console.error('Error saving registration entry:', error);
      toast.error(error?.data?.message || 'Failed to save registration entry');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{entry ? 'Edit Registration Entry' : 'Add Registration Entry'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="text"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mark Sheet</Form.Label>
                <Form.Control
                  type="file"
                  name="mark_sheet"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {entry && entry.mark_sheet && (
                  <small className="text-muted">
                    Current file: {entry.mark_sheet.split('/').pop()}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Result Certificate</Form.Label>
                <Form.Control
                  type="file"
                  name="result_certificate"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {entry && entry.result_certificate && (
                  <small className="text-muted">
                    Current file: {entry.result_certificate.split('/').pop()}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
        >
          {isCreating || isUpdating ? 'Saving...' : (entry ? 'Update' : 'Save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRegistrationEntryModal;
