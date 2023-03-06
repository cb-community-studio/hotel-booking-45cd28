
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const HoteldetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            hname: _entity.hname,
            haddress: _entity.haddress,
            hphone: _entity.hphone,
            hemail: _entity.hemail,
            hwebsite: _entity.hwebsite,
            hphoto: _entity.hphoto,
            hroomtype: _entity.hroomtype,
            havailability: _entity.havailability

        };

        setLoading(true);
        try {
            const result = await client.service("hoteldetails").create(_data);
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
            <div role="hoteldetails-create-dialog-component">
                <div>
                    <p className="m-0" >Hotel Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.hname} onChange={(e) => setValByKey("hname", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hotel Address:</p>
                    <InputText className="w-full mb-3" value={_entity?.haddress} onChange={(e) => setValByKey("haddress", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hotel Phone Number:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.hphone} onChange={(e) => setValByKey("hphone", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hotel Email:</p>
                    <InputText className="w-full mb-3" value={_entity?.hemail} onChange={(e) => setValByKey("hemail", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hotel Website:</p>
                    <InputText className="w-full mb-3" value={_entity?.hwebsite} onChange={(e) => setValByKey("hwebsite", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hotel Photo:</p>
                    <InputText className="w-full mb-3" value={_entity?.hphoto} onChange={(e) => setValByKey("hphoto", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >hroomtype:</p>
                    <InputText className="w-full mb-3" value={_entity?.hroomtype} onChange={(e) => setValByKey("hroomtype", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hotel Availability:</p>
                    <Checkbox checked={_entity?.havailability} onChange={ (e) => setValByKey("havailability", e.checked)}  ></Checkbox>
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

export default connect(null, mapDispatch)(HoteldetailsCreateDialogComponent);
// createDialog_code.template
