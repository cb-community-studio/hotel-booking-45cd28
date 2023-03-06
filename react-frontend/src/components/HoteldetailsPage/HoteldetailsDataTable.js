
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';


const HoteldetailsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.hname}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.haddress}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.hphone}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.hemail}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.hwebsite}</p>
    const imageTemplate5 = (rowData, { rowIndex }) => <Image src={rowData.hphoto}  alt="Image" height="60px" />
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.hroomtype}</p>
    const tickTemplate7 = (rowData, { rowIndex }) => <i className={`pi ${rowData.havailability?"pi-check": "pi-times"}`}  ></i>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="hname" header="Hotel Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="haddress" header="Hotel Address" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="hphone" header="Hotel Phone Number" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="hemail" header="Hotel Email" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="hwebsite" header="Hotel Website" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="hphoto" header="Hotel Photo" body={imageTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="hroomtype" header="hroomtype" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="havailability" header="Hotel Availability" body={tickTemplate7} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default HoteldetailsDataTable;