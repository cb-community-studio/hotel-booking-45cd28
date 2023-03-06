
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


const PaymentDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.paymentid}</p>
    const inputTemplate1 = (rowData, { rowIndex }) => <InputText value={rowData.amount}  />
    const calendarTemplate2 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.paydate)} showTime ></Calendar>
    const tickTemplate3 = (rowData, { rowIndex }) => <i className={`pi ${rowData.paymentmethod?"pi-check": "pi-times"}`}  ></i>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.status}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="paymentid" header="Payment ID" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="amount" header="Paid Amount" body={inputTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="paydate" header="Date Paid" body={calendarTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="paymentmethod" header="Payment Method" body={tickTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="status" header="Payment Status" body={pTemplate4} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default PaymentDataTable;