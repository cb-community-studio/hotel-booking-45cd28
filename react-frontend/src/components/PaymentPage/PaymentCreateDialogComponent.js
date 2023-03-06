
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';


 
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

const PaymentCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            paymentid: _entity.paymentid,
            amount: _entity.amount,
            paydate: _entity.paydate,
            paymentmethod: _entity.paymentmethod,
            status: _entity.status

        };

        setLoading(true);
        try {
            const result = await client.service("payment").create(_data);
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
            <div role="payment-create-dialog-component">
                <div>
                    <p className="m-0" >Payment ID:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.paymentid} onChange={(e) => setValByKey("paymentid", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Paid Amount:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Date Paid:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.paydate} onChange={ (e) => setValByKey("paydate", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Payment Method:</p>
                    <Checkbox checked={_entity?.paymentmethod} onChange={ (e) => setValByKey("paymentmethod", e.checked)}  ></Checkbox>
                </div>
                <div>
                    <p className="m-0" >Payment Status:</p>
                    <InputText className="w-full mb-3" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
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

export default connect(null, mapDispatch)(PaymentCreateDialogComponent);
// createDialog_code.template
