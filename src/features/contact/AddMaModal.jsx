import React, { useState, useEffect } from 'react';
import CommonModal from '../../components/shared/modalLayout/CommonModal.jsx';
import { Row, Col } from 'react-bootstrap';
import InputWithLabel from '../../components/shared/fields/InputWithLabel.jsx';
import Button from '../../components/shared/buttons/button.jsx';
import SelectBox from "../../components/shared/fields/SelectBox .jsx";
import { toast } from 'react-toastify';

const AddMaModal = ({ show, handleClose, setShow, manager, mode }) => {
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        email: '',
        phone_number: '',
        gender: 'male',
        address: '',
        date_of_joining: '',
        status: 1,
    });

    useEffect(() => {
        if (mode === 'edit' && manager) {
            setFormData({
                name: manager.name || '',
                company_name: manager.company_name || '',
                email: manager.email || '',
                phone_number: manager.phone_number || '',
                gender: manager.gender || 'male',
                address: manager.address || '',
                date_of_joining: manager.date_of_joining || '',
                status: manager.status || 1,
            });
        } else {
            setFormData({
                name: '',
                company_name: '',
                email: '',
                phone_number: '',
                gender: 'male',
                address: '',
                date_of_joining: '',
                status: 1,
            });
        }
    }, [mode, manager]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // For now, just show success message
            toast.success(mode === 'add' ? 'Manager created successfully!' : 'Manager updated successfully!');
            handleClose();
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            console.error('Error creating/updating manager:', error);
        }
    };

    return (
        <CommonModal show={show} handleClose={handleClose} setShow={setShow} title={mode === 'add'? 'Add Manager': 'Edit Manager'}>
            <Row>
                <Col lg={6}>
                    <InputWithLabel
                        label="Employee Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Employee Name"
                    />
                </Col>
                <Col lg={6}>
                    <SelectBox
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                        ]}
                    />
                </Col>
                <Col lg={6}>
                    <SelectBox
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={[
                            { value: 1, label: "Active" },
                            { value: 0, label: "Inactive" },
                        ]}
                    />
                </Col>
                <Col className="text-end">
                    <Button
                        label={mode === 'add'? 'Add Manager': 'Save Changes'}
                        size="small"
                        onClick={handleSubmit}
                    />
                </Col>
            </Row>
        </CommonModal>
    );
};

export default AddMaModal;