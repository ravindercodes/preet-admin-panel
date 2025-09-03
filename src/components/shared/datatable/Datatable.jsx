// Datatable.js
import React from "react";
import Table from "react-bootstrap/Table";
import TableFilter from "./TableFilter";
import Pagination from "../pagination/Pagination";

const Datatable = ({ tableData, columns, title, onClick, buttonTitle, pagination }) => {

    if (!tableData || !Array.isArray(tableData)) {
        console.warn("tableData is undefined or not an array:", tableData); // Helpful debugging
        tableData = [];
    }
    if (!columns || !Array.isArray(columns)) {
        console.warn("columns is undefined or not an array:", columns); // Helpful debugging
        columns = [];
    }

    return (
        <div className="table_wrapper d-flex flex-column">
            <TableFilter title={title} onClick={onClick} buttonTitle={buttonTitle} />
            <div className="flex-grow-1">
                <Table responsive="sm">
                    <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => {
                                let cellContent;

                                if (column.cell) {
                                    cellContent = column.cell({ row, value: row[column.accessor] });
                                } else {
                                    cellContent = row[column.accessor];
                                }

                                return <td key={colIndex}>{cellContent}</td>;
                            })}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            {pagination && (
                <Pagination 
                    pageCount={pagination.pageCount} 
                    onPageChange={pagination.onPageChange} 
                    currentPage={pagination.currentPage} 
                />
            )}
        </div>
    );
};

export default Datatable;