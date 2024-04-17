import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Button from "components/button/Button";
import Select from "react-select";
import ListSelect from "components/forms/ListSelect";
import FirebaseImageUpload from "components/uploader/FirebaseMultiImageUpload";
import catalogActions from "redux/catalog/actions";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { paymentProvidersGet } from "redux/users/service";
import { BulkPaymentUpload } from "redux/orders/service";
const options = [
  { value: "Move to processing", label: "Move to processing" },
  { value: "Hold order", label: "Hold order" },
];

const defulatStates = {
  payments: [
    {
      orderId: null,
      amount: 0,
      description: "",
    },
  ],
  paymentProviderId: "",
  receivedDate: new Date(),
  attachment: "",
  action: "",
  paymentType: "ADVANCE",
};

const PaymentForm = (props) => {
  const { failureWithTimeout, successWithTimeout } = props;
  const ref = React.useRef();
  const [updatePaymentRequest, setUpdatePaymentRequest] = useState({
    ...defulatStates,
  });
  const [saving, setSaving] = useState(false);
  const [paymentProviders, setPaymentProviders] = useState([]);
  const usePaymentRequestPermission = useRolePermissions("ADV_PAYMENT_REQUEST");

  useEffect(() => {
    paymentProvidersGet().then((res) => {
      setPaymentProviders(res.data);
    });
  }, []);

  const onSave = async () => {
    setSaving(true);
    BulkPaymentUpload(updatePaymentRequest)
      .then((res) => {
        successWithTimeout("Payment request save successfully.");
        setUpdatePaymentRequest({
          payments: [
            {
              orderId: null,
              amount: 0,
              description: "",
            },
          ],
          paymentProviderId: "",
          receivedDate: new Date(),
          attachment: "",
          action: "",
          paymentType: "ADVANCE",
        });
        setSaving(false);
      })
      .catch((err) => {
        failureWithTimeout(err.response.data.message);
        setSaving(false);
      });
  };

  const onImageUpload = (url) => {
    setUpdatePaymentRequest((previous) => ({
      ...previous,
      // payments: [
      //   {
      //     orderId: previous.payments[0].orderId,
      //     amount: previous.payments[0].amount
      //   },
      // ],
      // paymentProviderId: previous.paymentProviderId,
      // receivedDate: previous.receivedDate,
      // action: previous.action,
      attachment: url,
    }));
  };

  return (
    <div>
      <div className="mb-6 plr-15">
        <div className="introduction">Advance Payment Request</div>
      </div>
      <div className="row ma-0">
        <div className="col-lg-7 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1"></div>
            </div>
            <div className="roe-card-body">
              <form>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Order ID</label>
                  <div className="col-sm-8">
                    <input
                      readOnly={!usePaymentRequestPermission}
                      type="number"
                      className="form-control react-form-input"
                      value={updatePaymentRequest.payments[0].orderId || ""}
                      onChange={(e) =>
                        setUpdatePaymentRequest({
                          ...updatePaymentRequest,
                          payments: [
                            {
                              ...updatePaymentRequest.payments[0],
                              orderId: e.target.value,
                            },
                          ],
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Payment Received
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      disabled={!usePaymentRequestPermission}
                      value={updatePaymentRequest.payments[0].amount || ""}
                      onChange={(e) =>
                        setUpdatePaymentRequest({
                          ...updatePaymentRequest,
                          payments: [
                            {
                              ...updatePaymentRequest.payments[0],
                              amount: e.target.value,
                            },
                          ],
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Bank Name</label>
                  <div className="col-sm-8" style={{ zIndex: 3 }}>
                    <ListSelect
                      list={paymentProviders}
                      value={updatePaymentRequest.paymentProviderId || ""}
                      labelSelector={(i) => i.name}
                      allowEdit={!usePaymentRequestPermission}
                      onChange={(id) =>
                        setUpdatePaymentRequest({
                          ...updatePaymentRequest,
                          paymentProviderId: id,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Received Date
                  </label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        disabled={!usePaymentRequestPermission}
                        style={{ width: "50%" }}
                        label="Received Date"
                        inputFormat="dd/MM/yyyy"
                        value={updatePaymentRequest.receivedDate}
                        onChange={(newValue) =>
                          setUpdatePaymentRequest({
                            ...updatePaymentRequest,
                            receivedDate: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Attachment</label>
                  <div className="col-sm-8">
                    <FirebaseImageUpload
                      text={"Upload Attachment"}
                      onImageUpload={onImageUpload}
                      onImageUploadError={(err) => failureWithTimeout(err)}
                    />
                    {updatePaymentRequest.attachment && (
                      <a href={updatePaymentRequest.attachment} target="_blank">
                        Attachment
                      </a>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Action</label>
                  <div className="col-sm-8">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      value={options.find(
                        (c) => c.value === updatePaymentRequest.action
                      )}
                      onChange={(o) => {
                        setUpdatePaymentRequest({
                          ...updatePaymentRequest,
                          action: o.value,
                        });
                      }}
                      options={options}
                    ></Select>
                  </div>
                </div>

                {usePaymentRequestPermission && (
                  <Button
                    type="button"
                    className="c-btn ma-5 c-success"
                    dataStyle="expand-left"
                    onClick={onSave}
                    loading={saving}
                    disabled={saving}
                  >
                    Save
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(catalogActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
