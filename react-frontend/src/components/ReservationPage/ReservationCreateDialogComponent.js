
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ReservationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            reservationid: _entity.reservationid,
            rcustomername: _entity.rcustomername,
            checkin: _entity.checkin,
            checkout: _entity.checkout,
            noofnight: _entity.noofnight,
            numberguess: _entity.numberguess,
            roomtype: _entity.roomtype,
            roomrate: _entity.roomrate,
            paymentdetail: _entity.paymentdetail

        };

        setLoading(true);
        try {
            const result = await client.service("reservation").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="reservation-create-dialog-component">
                <div>
                    <p className="m-0" >Reservation ID:</p>
                    <InputText className="w-full mb-3" value={_entity?.reservationid} onChange={(e) => setValByKey("reservationid", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Customer Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.rcustomername} onChange={(e) => setValByKey("rcustomername", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Check-in:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.checkin} onChange={ (e) => setValByKey("checkin", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Check Out:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.checkout} onChange={ (e) => setValByKey("checkout", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Number of night:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.noofnight} onChange={(e) => setValByKey("noofnight", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Number of guess:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.numberguess} onChange={(e) => setValByKey("numberguess", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Room Type:</p>
                    <InputText className="w-full mb-3" value={_entity?.roomtype} onChange={(e) => setValByKey("roomtype", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Room Rate:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.roomrate} onChange={(e) => setValByKey("roomrate", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Payment Details:</p>
                    <InputText className="w-full mb-3" value={_entity?.paymentdetail} onChange={(e) => setValByKey("paymentdetail", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(ReservationCreateDialogComponent);
// createDialog_code.template
