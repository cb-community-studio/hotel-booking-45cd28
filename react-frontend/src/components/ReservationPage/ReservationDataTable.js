
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';


const ReservationDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.reservationid}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.rcustomername}</p>
    const calendarTemplate2 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.checkin)} showTime ></Calendar>
    const calendarTemplate3 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.checkout)} showTime ></Calendar>
    const inputTemplate4 = (rowData, { rowIndex }) => <InputText value={rowData.noofnight}  />
    const inputTemplate5 = (rowData, { rowIndex }) => <InputText value={rowData.numberguess}  />
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.roomtype}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.roomrate}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.paymentdetail}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="reservationid" header="Reservation ID" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="rcustomername" header="Customer Name" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="checkin" header="Check-in" body={calendarTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="checkout" header="Check Out" body={calendarTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="noofnight" header="Number of night" body={inputTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="numberguess" header="Number of guess" body={inputTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="roomtype" header="Room Type" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="roomrate" header="Room Rate" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="paymentdetail" header="Payment Details" body={pTemplate8} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ReservationDataTable;