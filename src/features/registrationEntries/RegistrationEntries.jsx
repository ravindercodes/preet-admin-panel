import React, { useState, useEffect } from 'react';
import Datatable from '../../components/shared/datatable/Datatable.jsx';
import { EditSvg } from '@/svgFiles/EditSvg';
import { useGetRegistrationEntriesQuery } from "./registrationEntriesApi";
import { Form, Container, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentSvg } from '@/svgFiles/DocumentSvg';
import { PlusSvg } from '@/svgFiles/PlusSvg';
import AddRegistrationEntryModal from './AddRegistrationEntryModal';
import { DeleteSvg } from '@/svgFiles/DeleteSvg';

const RegistrationEntries = () => {
    const { admissionId } = useParams();
    const { data: registrationEntries = [], isLoading, refetch } = useGetRegistrationEntriesQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const navigate = useNavigate();

    // Apply search filter if search term exists
    const displayData = searchTerm.trim() ?
        registrationEntries.filter(entry =>
            entry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.registration_number?.toLowerCase().includes(searchTerm.toLowerCase())
        ) :
        registrationEntries;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setShowAddModal(true);
    };

    const handleAddNew = () => {
        setEditingEntry(null);
        setShowAddModal(true);
    };

    const handleModalClose = () => {
        setShowAddModal(false);
        setEditingEntry(null);
        refetch(); // Refresh data after modal closes
    };

    const handleViewDocument = (documentUrl) => {
        if (documentUrl) {
            window.open("https://api.preetinstitute.in/storage/app/public/"+documentUrl, '_blank');
        }
    };

    const columns = [
        { label: "Name", accessor: "name" },
        { label: "Registration Number", accessor: "registration_number" },
        { label: "Marks", accessor: "marks" },
        {
            label: "Mark Sheet",
            accessor: "mark_sheet",
            cell: ({ value }) => (
                <Button
                    variant="link"
                    className="p-0"
                    onClick={() => handleViewDocument(value)}
                    disabled={!value}
                >
                    {DocumentSvg}
                </Button>
            ),
        },
        {
            label: "Result Certificate",
            accessor: "result_certificate",
            cell: ({ value }) => (
                <Button
                    variant="link"
                    className="p-0"
                    onClick={() => handleViewDocument(value)}
                    disabled={!value}
                >
                    {DocumentSvg}
                </Button>
            ),
        },
        {
            label: "Actions",
            accessor: "actions",
            cell: ({ row }) => (
                <div className="d-flex">
                    <span className='cursor-pointer pe-2' onClick={() => handleEdit(row)}>
                        {EditSvg}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <Container fluid>
            <div className="mb-4 mt-3">
                <Row>
                    <Col md={6}>
                        <h4 className="mb-3">Registration Entries</h4>
                    </Col>
                    <Col md={6}>
                        <h4 className="mb-3">Search Entries</h4>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search by name or registration number"
                                value={searchTerm}
                                onChange={handleSearch}
                                aria-label="Search entries"
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <Button
                    variant="primary"
                    className="d-flex align-items-center"
                    onClick={handleAddNew}
                >
                    <span className="me-1">{PlusSvg}</span> Add Registration Entry
                </Button>
            </div>

            <Datatable
                title="Registration Entries"
                columns={columns}
                tableData={displayData}
            />

            {showAddModal && (
                <AddRegistrationEntryModal
                    show={showAddModal}
                    onHide={handleModalClose}
                    entry={editingEntry}
                    admissionId={admissionId}
                />
            )}
        </Container>
    );
};

export default RegistrationEntries;
