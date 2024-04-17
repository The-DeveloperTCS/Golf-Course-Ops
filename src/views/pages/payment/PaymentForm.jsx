import Button from "components/button/Button";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import catalogActions from "redux/catalog/actions";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import NotificationActions from "redux/notifications/actions";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import OrderStatusBadge from "components/orders/OrderStatusBadge";
import OrderPaymentsLedger from "./OrderPaymentsLedger";
import React, { useEffect, useState, useCallback } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { merchantGet, paymentProvidersGet } from "redux/users/service";
import {
  orderById,
  PaymentUpdate,
  BulkPaymentUpload,
  fetchOrderPayments,
  getCouriersList,
  orderBalancepaymentFetch,
} from "redux/orders/service";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import ListSelect from "components/forms/ListSelect";
import Papa from "papaparse";

const defulatStates = {
  orderId: null,
  amount: 0,
  courierCharges: 0,
  description: "",
  paymentProviderId: "",
  bankReferenceNumber: "",
  receivedDate: new Date(),
  courierInvoiceNumber: "",
  courierId: 0,
};

const PaymentForm = (props) => {
  const { failureWithTimeout, successWithTimeout } = props;
  const ref = React.useRef();
  const [updatePayment, setUpdatePayment] = useState({ ...defulatStates });
  const [orderUpdate, setOrderUpdated] = useState(null);
  const [paymentLedger, setPaymentLedger] = useState([]);
  const [showSalesAgent, setShowSaleAgent] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [additionalPayment, setAdditionalPayment] = useState(false);
  const [refundPayment, setRefundPayment] = useState(false);
  const permissions = useSelector((state) => state.auth.permissions);
  const usePaymentPermission = useRolePermissions("PAYMENT");
  const [paymentProviders, setPaymentProviders] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [bulkPaymentFile, setBulkPaymentFile] = useState("");
  const [hideBulkPayment, setHideBulkPayment] = useState(false);
  const [hideSinglePayment, setSinglePayment] = useState(false);
  const [hideFetch, setHideFetch] = useState(false);
  const [data, setData] = useState([]);
  const [batchTotalAmount, setBatchTotalAmount] = useState(0);
  const [orderIds, setOrderIds] = useState([]);
  const [ordersBalancePayment, setOrderBalancePayments] = useState([]);

  useEffect(() => {
    paymentProvidersGet().then((res) => {
      setPaymentProviders(res.data);
    });
  }, []);

  useEffect(() => {
    getCouriersList().then((res) => setCouriers(res.data));
  }, []);

  useEffect(() => {
    let paymentRecived = 0;
    let courierCharges = 0;

    for (var index in data) {
      paymentRecived = paymentRecived + Number(data[index].payment_received);
      courierCharges = courierCharges + Number(data[index].courier_charges);

      var balacnceOrderPayment = ordersBalancePayment.filter(
        (p) => p.id == data[index].order_id
      );

      updateData({
        row: {
          ...data[index],
          balancePayment: balacnceOrderPayment[0]?.balancePayment,
          warning:
            balacnceOrderPayment[0]?.balancePayment <
            Number(data[index].payment_received)
              ? "TRUE"
              : "FALSE",
        },
        index,
      });
    }
    setBatchTotalAmount(paymentRecived - courierCharges);
    setFetching(false);
  }, [ordersBalancePayment]);

  const onFetch = async (updatePayment) => {
    setHideBulkPayment(true);
    orderById(updatePayment.orderId)
      .then((res) => {
        setOrderUpdated(res.data);
        merchantGet(res.data?.merchantId).then((response) => {
          if (response.data[0].salesAgentId) {
            merchantGet(response.data[0]?.salesAgentId).then((resp) => {
              setShowSaleAgent(resp.data[0]?.title);
            });
          }
        });
        onFetchPaymentLedger(updatePayment);
        setFetching(false);
      })
      .catch((e) => {
        props.failureWithTimeout(e.response.data.message);
        setOrderUpdated(null);
      })
      .finally(() => setFetching(false));
  };

  const onFetchPaymentLedger = async (updatePayment) => {
    fetchOrderPayments(updatePayment.orderId)
      .then((res) => {
        setPaymentLedger(res.data);
      })
      .catch((err) => {
        setPaymentLedger([]);
      });
  };

  const onSave = async () => {
    setSaving(true);
    if (bulkPaymentFile !== "") {
      const [bulkPayments] = await Promise.all([parseFile(bulkPaymentFile)]);
      process(bulkPayments);
    } else {
      setShowConfirm(!showConfirm);
    }
  };

  const process = (bulkPaymentData) => {
    // setBalancePaymentFetched(false)
    const processed = [];

    let headers = bulkPaymentData.shift().map((h) =>
      h
        .replace(/[:*.]/g, "")
        .trim()
        .replace(" ", "_")
        .toLowerCase()
    );
    bulkPaymentData.forEach((row) => {
      let obj = {};
      row.forEach((val, i) => {
        obj[headers[i]] = val;
      });
      processed.push({
        orderId: obj.order_id,
        amount: obj.payment_received,
        courierCharges: obj.courier_charges,
        description: obj.description,
        receiveExtraPayment: obj.receiveextrapayment === "TRUE" ? true : false,
      });
    });

    BulkPaymentUpload({
      receivedDate: updatePayment.receivedDate,
      bankReferenceNumber: updatePayment.bankReferenceNumber,
      paymentProviderId: updatePayment.paymentProviderId,
      courierId: updatePayment.courierId,
      courierInvoiceNumber: updatePayment.courierInvoiceNumber,
      payments: processed,
      paymentType: "COD",
    })
      .then((res) => {
        successWithTimeout("Payment added successfully!");
        setSaving(false);
        setUpdatePayment({
          orderId: null,
          amount: 0,
          courierCharges: 0,
          receivedDate: new Date(),
        });
        ref.current.value = "";
        setHideBulkPayment(false);
        setSinglePayment(false);
        setBulkPaymentFile("");
        setHideFetch(false);
      })
      .catch((err) => {
        if (err?.response.data.message) {
          setAdditionalPayment(true);
        }
        setSaving(false);
      });
  };

  const parseFile = async (file) => {
    return new Promise((resolve, reject) => {
      if (file === "") return resolve([]);

      Papa.parse(file, {
        complete: function(results) {
          resolve(results.data);
        },
        error: function(err) {
          reject(err);
        },
      });
    });
  };

  const onUpdate = (description) => {
    if (updatePayment.amount < 0) {
      var role = ["ROLE_ADMIN", "ROLE_OPS_MANAGER"];
      const permission = permissions.filter((permission) =>
        role.includes(permission.role)
      );
      if (permission.length > 0) {
        setShowConfirm(!showConfirm);
        setRefundPayment(true);
      } else {
        paymentUpdateOrder(description);
      }
    } else {
      paymentUpdateOrder(description);
    }
  };

  const paymentUpdateOrder = async (description) => {
    setShowConfirm(false);
    setRefundPayment(false);
    setAdditionalPayment(false);
    PaymentUpdate({
      ...updatePayment,
      description: description,
    })
      .then((res) => {
        successWithTimeout("Payment added successfully!");
        setSaving(false);
        setOrderUpdated(res.data);
        setUpdatePayment({
          orderId: updatePayment.orderId,
          amount: 0,
          courierCharges: 0,
          receivedDate: new Date(),
        });
        onFetchPaymentLedger(updatePayment);
      })
      .catch((err) => {
        /**
         * disabling the popup of server error
         */
        // failureWithTimeout(err.response.data.message);
        if (err.response.data.message) {
          setAdditionalPayment(true);
        }
      })
      .finally(() => setShowConfirm(false), setSaving(false));
  };

  const onUpdateWithAdditionalPayment = () => {
    setAdditionalPayment(false);
    PaymentUpdate({
      ...updatePayment,
      receiveExtraPayment: true,
    })
      .then((res) => {
        successWithTimeout("Payment added successfully!");
        setSaving(false);
        setOrderUpdated(res.data);
        setUpdatePayment({
          orderId: updatePayment.orderId,
          amount: 0,
          courierCharges: 0,
          receivedDate: new Date(),
        });
        onFetchPaymentLedger(updatePayment);
      })
      .catch((err) => {
        failureWithTimeout(err.response.data.message);
      })
      .finally(() => setShowConfirm(false), setSaving(false));
  };

  const onUpdateWithRefundPayment = () => {
    setRefundPayment(false);
    PaymentUpdate({
      ...updatePayment,
      refund: true,
    })
      .then((res) => {
        successWithTimeout("Payment added successfully!");
        setSaving(false);
        setOrderUpdated(res.data);
        setUpdatePayment({
          orderId: updatePayment.orderId,
          amount: 0,
          courierCharges: 0,
          receivedDate: new Date(),
        });
        onFetchPaymentLedger(updatePayment);
      })
      .catch((err) => {
        failureWithTimeout(err.response.data.message);
      })
      .finally(() => setSaving(false));
  };

  const onPreview = async () => {
    const [bulkPayments] = await Promise.all([parseFile(bulkPaymentFile)]);
    processTable(bulkPayments);
  };

  const processTable = (raw) => {
    setFetching(true);
    const processed = [];
    const orderIds = [];

    let headers = raw.shift().map((h) =>
      h
        .replace(/[:*.]/g, "")
        .trim()
        .replace(" ", "_")
        .toLowerCase()
    );

    raw.forEach((row) => {
      let obj = {};
      row.forEach((val, i) => {
        obj[headers[i]] = val;
      });
      orderIds.push(obj.order_id);
      processed.push(obj);
    });

    setData(processed);
    setOrderIds(orderIds);
    fetchBalancePayment(orderIds);
  };

  const fetchBalancePayment = useCallback(
    (orderId) => {
      orderBalancepaymentFetch({ ids: orderId })
        .then((res) => {
          setOrderBalancePayments(res.data);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    [orderIds]
  );

  const updateData = ({ row, index }) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index] = row;
      return newData;
    });
  };

  const PeningPaymentsTable = ({ data }) => {
    if (data.length === 0) {
      return null;
    }
    return (
      <div className="row ma-0">
        <div className="col-lg-12 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1">
                Preview - <b>{data.length}</b> <br></br>
                Batch Total - <b>{batchTotalAmount}</b> <br></br>
                Total Warnings -{" "}
                <b>{data.filter((d) => d.warning === "TRUE").length}</b>
              </div>
            </div>

            <div className="roe-card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Order ID</th>
                    <th>Payment Recived</th>
                    <th>Balance Payment</th>
                    <th>Courier Charges</th>
                    <th>Description</th>
                    <th>Receive Extra Payment</th>
                    <th>Warning</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{row.order_id}</td>
                      <td>{row.payment_received}</td>
                      <td>{row?.balancePayment}</td>
                      <td>{row.courier_charges}</td>
                      <td>{row.description}</td>
                      <td>{row.receiveextrapayment}</td>
                      {row.warning === "TRUE" ? (
                        <td className="mlr-10 mt-10">
                          <div className="badge badge-warning">Warning</div>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const orderItemsRow = () => {
    return (
      <div className="col-lg-5 ptb-15">
        {orderUpdate !== null ? (
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1">Payment details</div>
            </div>
            <div className="roe-card-body">
              <>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <OrderStatusBadge
                      id={orderUpdate.statusId}
                    ></OrderStatusBadge>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Merchant ID</label>
                  <div className="col-sm-8">
                    <a
                      href={`/merchants/${orderUpdate?.merchantId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {orderUpdate?.merchantId}
                    </a>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Order ID</label>
                  <div className="col-sm-8">
                    <a
                      href={`/orders/${orderUpdate?.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {orderUpdate?.id}
                    </a>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Sale Agent</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={orderUpdate !== null ? showSalesAgent : ""}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Total Value</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={orderUpdate?.total || ""}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Total Payment Received
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={orderUpdate?.receivedPayment || 0}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Balance Payment
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={orderUpdate?.balancePayment || 0}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Total Courier Charges
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={orderUpdate?.courierCharges || 0}
                      readOnly={true}
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6 plr-15">
        <div className="introduction">Add New Payment</div>
      </div>

      <div className="row ma-0">
        <div className="col-lg-7 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1">
                {!hideFetch && (
                  <Button
                    type="button"
                    className="c-btn ma-5"
                    dataStyle="expand-left"
                    onClick={() => onFetch(updatePayment)}
                    loading={fetching}
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      display: "flex",
                    }}
                    disabled={!usePaymentPermission}
                  >
                    Fetch
                  </Button>
                )}
                {bulkPaymentFile !== "" && (
                  <Button
                    type="button"
                    className="c-btn ma-5 c-primary"
                    dataStyle="expand-left"
                    disabled={bulkPaymentFile === ""}
                    onClick={() => onPreview([bulkPaymentFile])}
                    loading={fetching}
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>
            <div className="roe-card-body">
              <form>
                {!hideSinglePayment && (
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Order ID</label>
                    <div className="col-sm-8">
                      <input
                        readOnly={!usePaymentPermission}
                        type="number"
                        className="form-control react-form-input"
                        value={updatePayment.orderId || ""}
                        onChange={(e) =>
                          setUpdatePayment({
                            ...updatePayment,
                            orderId: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {!hideBulkPayment && (
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Pending Payments
                    </label>
                    <div className="col-sm-5">
                      <input
                        type="file"
                        accept="text/csv"
                        className="form-control react-form-input"
                        ref={ref}
                        onChange={(e) => {
                          setBulkPaymentFile(e.target.files[0]);
                          setSinglePayment(true);
                          setHideFetch(true);
                        }}
                      />
                    </div>
                    <div className="col-sm-3">
                      <a
                        target="_blank"
                        href="https://docs.google.com/spreadsheets/d/1UdiUyP0eZs1F0dLT_LuMj_EL83_Xt9uKkmDiBaEb3bw/edit?usp=sharing"
                        className="c-btn ma-4 c-outline-info2"
                      >
                        <i className="fas"></i> Download Template
                      </a>
                    </div>
                  </div>
                )}
                {orderUpdate !== null || bulkPaymentFile ? (
                  <>
                    {bulkPaymentFile === "" && (
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
                          Payment Received
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control react-form-input"
                            disabled={!usePaymentPermission}
                            value={updatePayment.amount || ""}
                            onChange={(e) =>
                              setUpdatePayment({
                                ...updatePayment,
                                amount: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Bank Name
                      </label>
                      <div className="col-sm-8" style={{ zIndex: 3 }}>
                        <ListSelect
                          list={paymentProviders}
                          value={updatePayment.paymentProviderId || ""}
                          labelSelector={(i) => i.name}
                          allowEdit={!usePaymentPermission}
                          onChange={(id) =>
                            setUpdatePayment({
                              ...updatePayment,
                              paymentProviderId: id,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Bank Reference No
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control react-form-input"
                          disabled={!usePaymentPermission}
                          value={updatePayment.bankReferenceNumber || ""}
                          onChange={(e) =>
                            setUpdatePayment({
                              ...updatePayment,
                              bankReferenceNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">Courier</label>
                      <div className="col-sm-8" style={{ zIndex: 2 }}>
                        <ListSelect
                          disabled={!usePaymentPermission}
                          list={couriers}
                          value={updatePayment.courierId}
                          labelSelector={(c) => c.name}
                          onChange={(id) =>
                            setUpdatePayment({
                              ...updatePayment,
                              courierId: id,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Courier Invoice No
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control react-form-input"
                          disabled={!usePaymentPermission}
                          value={updatePayment.courierInvoiceNumber || ""}
                          onChange={(e) =>
                            setUpdatePayment({
                              ...updatePayment,
                              courierInvoiceNumber: e.target.value,
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
                            disabled={!usePaymentPermission}
                            style={{ width: "50%" }}
                            label="Received Date"
                            inputFormat="dd/MM/yyyy"
                            value={updatePayment.receivedDate}
                            onChange={(newValue) =>
                              setUpdatePayment({
                                ...updatePayment,
                                receivedDate: newValue,
                              })
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    {bulkPaymentFile === "" && (
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
                          Courier charges
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control react-form-input"
                            value={updatePayment.courierCharges || ""}
                            disabled={!usePaymentPermission}
                            onChange={(e) =>
                              setUpdatePayment({
                                ...updatePayment,
                                courierCharges: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                    {usePaymentPermission && (
                      <Button
                        type="button"
                        className="c-btn ma-5 c-success"
                        dataStyle="expand-left"
                        onClick={onSave}
                        loading={saving}
                        disabled={fetching}
                      >
                        Save
                      </Button>
                    )}
                  </>
                ) : null}
              </form>
            </div>
          </div>
        </div>

        {orderItemsRow()}
        {bulkPaymentFile !== "" && <PeningPaymentsTable data={data} />}
        <OrderPaymentsLedger paymentLedger={paymentLedger} />

        {showConfirm && (
          <SweetAlert
            input
            custom
            showCancel
            show={showConfirm}
            confirmBtnText="Yes"
            cancelBtnText="Cancel"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            title="Enter comment"
            confirmBtnCssClass="sweet-alert-confirm-button"
            cancelBtnCssClass="sweet-alert-cancel-button"
            onConfirm={(description) => {
              setUpdatePayment({
                ...updatePayment,
                description: description,
              });
              onUpdate(description);
            }}
            onCancel={() => {
              setShowConfirm(!showConfirm);
              setSaving(!saving);
            }}
          ></SweetAlert>
        )}
        {additionalPayment && (
          <SweetAlert
            custom
            showCancel
            show={additionalPayment}
            confirmBtnText="Yes"
            cancelBtnText="No"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            title="You are receiving more payment than the order total, are you sure?"
            confirmBtnCssClass="sweet-alert-confirm-button"
            cancelBtnCssClass="sweet-alert-cancle-button"
            onConfirm={(description) => {
              onUpdateWithAdditionalPayment(updatePayment, description);
            }}
            onCancel={() => {
              setAdditionalPayment(false);
              setUpdatePayment({
                ...updatePayment,
                amount: 0,
                courierCharges: 0,
                description: "",
                receivedDate: new Date(),
              });
            }}
          ></SweetAlert>
        )}
        {refundPayment && (
          <SweetAlert
            custom
            showCancel
            show={refundPayment}
            confirmBtnText="Yes"
            cancelBtnText="No"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            title="You want to refund the amount in the merchant wallet?"
            confirmBtnCssClass="sweet-alert-confirm-button"
            cancelBtnCssClass="sweet-alert-cancle-button"
            onConfirm={() => {
              onUpdateWithRefundPayment(updatePayment);
            }}
            onCancel={() => {
              setRefundPayment(false);
              paymentUpdateOrder(updatePayment.description);
            }}
          ></SweetAlert>
        )}
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
