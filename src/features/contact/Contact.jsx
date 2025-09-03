import React from 'react';
import Datatable from '../../components/shared/datatable/Datatable.jsx';
import { EditSvg } from '@/svgFiles/EditSvg';
import {useGetApprovedAdmissionsQuery, useGetNotApprovedAdmissionsQuery} from "@/features/admission/admissionsApi";

const Contact = () => {
    const { data: approvedAdmissions } = useGetApprovedAdmissionsQuery();
    const { data: nonApprovedAdmissions } = useGetNotApprovedAdmissionsQuery();

    const handleEdit = (manager) => {
        setEditManager(manager);
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
                    {/* <span className='cursor-pointer' onClick={() => handleDelete(row)}>
                        {DeleteSvg}
                    </span> */}
                </>
            ),
        },
    ];

    return (
        <div>
            <Datatable
                title="Students Data"
                columns={columns}
                tableData={approvedAdmissions}
                // onClick={AddManager}
                // buttonTitle={"Add Managers"}
            />
        </div>
    );
};

export default Contact;
