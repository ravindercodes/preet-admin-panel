import React, { useState } from 'react';
import Datatable from '../../components/shared/datatable/Datatable.jsx';
import { EditSvg } from '@/svgFiles/EditSvg';
import {
    useGetApprovedAdmissionsQuery,
    useGetNotApprovedAdmissionsQuery,
    useGetRejectedAdmissionsQuery
} from "./admissionsApi";
import { Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
    const { data: approvedAdmissions = [] } = useGetApprovedAdmissionsQuery();
    const { data: rejectedAdmissions = [] } = useGetRejectedAdmissionsQuery();
    const { data: nonApprovedAdmissions = [] } = useGetNotApprovedAdmissionsQuery();
    const [filterType, setFilterType] = useState('all'); // 'all', 'approved', 'notApproved'
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    // Determine which data to display based on filter
    const filteredData = filterType === 'approved' ? approvedAdmissions :
                       filterType === 'notApproved' ? nonApprovedAdmissions :
                       filterType === 'rejected' ? rejectedAdmissions :
                       [...(approvedAdmissions || []), ...(nonApprovedAdmissions || []), ...(rejectedAdmissions || [])];
    
    // Apply search filter if search term exists
    const displayData = searchTerm.trim() ? 
        filteredData.filter(student => 
            student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            student.father_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.roll_number?.toLowerCase().includes(searchTerm.toLowerCase())
        ) : 
        filteredData;
    
    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleEdit = (student) => {
        // Navigate to detail page with student data using React Router
        navigate(`/admission/${student.id}`);
    };
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const columns = [
        { label: "Student Name", accessor: "name" },
        { label: "Father Name", accessor: "father_name" },
        { label: "Class", accessor: "class_wish" },
        { label: "Roll no", accessor: "roll_number" },
        { label: "Address", accessor: "address" },
        { label: "Contact Date", accessor: "created_at" },
        {
            label: "Status",
            accessor: "status",
            cell: ({ value }) => <span className={value === 'Active' ? 'cmn_badge' : 'cmn_badge inactive'}>{value}</span>, // Conditional class
        },
        {
            label: "Edit/Delete",
            accessor: "actions",
            cell: ({ row }) => (
                <>
                    <span className='cursor-pointer pe-2' onClick={() => handleEdit(row)}>
                        {EditSvg}
                    </span>

                </>
            ),
        },
    ];

    return (
        <Container fluid>
            <div className="mb-4 mt-3">
                <Row>
                    <Col md={6}>
                        <h4 className="mb-3">Filter Admissions</h4>
                        <div className="d-flex align-items-center">
                            <Form.Check
                                inline
                                type="radio"
                                label="All"
                                name="admissionFilter"
                                id="filter-all"
                                value="all"
                                checked={filterType === 'all'}
                                onChange={handleFilterChange}
                                className="me-3"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Approved"
                                name="admissionFilter"
                                id="filter-approved"
                                value="approved"
                                checked={filterType === 'approved'}
                                onChange={handleFilterChange}
                                className="me-3"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Not Approved"
                                name="admissionFilter"
                                id="filter-notApproved"
                                value="notApproved"
                                checked={filterType === 'notApproved'}
                                onChange={handleFilterChange}
                                className="me-3"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Rejected"
                                name="admissionFilter"
                                id="filter-rejected"
                                value="rejected"
                                checked={filterType === 'rejected'}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <h4 className="mb-3">Search Students</h4>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search by name, father's name, or roll number"
                                value={searchTerm}
                                onChange={handleSearch}
                                aria-label="Search students"
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </div>
            
            <Datatable
                title="Students Data"
                columns={columns}
                tableData={displayData}
            />
        </Container>
    );
};

export default Admission;
