import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PaymentActions from "redux/payment/actions";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import DataTableBulkPayment from "components/table/DataTableIBulkPayment";
import { useDispatch } from "react-redux";
import { approveBatch, rejectBatch } from "redux/payment/service";
import SweetAlert from "react-bootstrap-sweetalert";
import { paymentProvidersGet } from "redux/users/service";
import Select from "react-select";

const BulkPaymentList = (props) => {
  const {
    bulkPayments,
    fetchbulkPaymentsWithPagination,
    bulkPaymentsPageLimit,
    bulkPaymentsPageNo,
    bulkPaymentsTotal,
  } = props;
  const dispatch = useDispatch();
  const [rowPerPage, setRowPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [batchId, setBatchId] = useState("");
  const [sortOrder, setSortOrder] = useState("2");
  const [status, setStatus] = useState("");
  const [bulkPayment, setBulkPayment] = useState([]);
  const [bankInfoModal, setBankInfoModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [actionCalled, setActionCalled] = useState(false);
  const [batch, setBatch] = useState();
  const [bankNameGet, setBankNameGet] = useState(false);
  const [bankRefNoGet, setBankRefNoGet] = useState(false);
  const [paymentProviders, setPaymentProviders] = useState([]);

  useEffect(() => {
    setBulkPayment(bulkPayments);
    paymentProvidersGet().then((res) => {
      setPaymentProviders(res.data);
    });
  }, [bulkPayments]);

  useEffect(() => {
    window.scrollTo(200, 500);
    setBatchId("");
    setSortOrder("2");
    setStatus("");
    fetchbulkPaymentsWithPagination(
      10,
      bulkPaymentsPageNo,
      batchId,
      sortOrder,
      status,
      "COD"
    );
  }, [fetchbulkPaymentsWithPagination]);

  const paymentProviderOptions = useMemo(() => {
    return paymentProviders.map((c) => {
      return { label: c.name, value: c.id };
    });
  }, [paymentProviders]);

  useEffect(() => {
    setRowPerPage(bulkPaymentsPageLimit);
    setTotalCount(bulkPaymentsTotal);
    setTotalPages(Math.ceil(bulkPaymentsTotal / bulkPaymentsPageLimit));
  }, [bulkPaymentsTotal, bulkPaymentsPageLimit, bulkPaymentsPageNo]);

  const handleChangePage = (event) => {
    fetchbulkPaymentsWithPagination(
      bulkPaymentsPageLimit,
      event,
      batchId,
      sortOrder,
      status,
      "COD"
    );
  };

  const handleChangeRowsPerPage = (event) => {
    fetchbulkPaymentsWithPagination(event.target.value, bulkPaymentsPageNo);
  };

  const onChangeFilter = (value, tab) => {
    if (tab === "batchId") {
      setBatchId(value);
    }
  };

  useEffect(() => {
    itemReleasePagination();
  }, [batchId, sortOrder]);

  const itemReleasePagination = () => {
    setTimeout(() => {
      if (batchId !== "" || sortOrder !== "") {
        fetchbulkPaymentsWithPagination(
          10,
          1,
          batchId,
          sortOrder,
          status,
          "COD"
        );
      } else {
        fetchbulkPaymentsWithPagination(
          10,
          bulkPaymentsPageNo,
          batchId,
          sortOrder,
          status,
          "COD"
        );
      }
    }, 1000);
  };

  const columns = useMemo(
    () => [
      {
        title: "Batch ID",
        id: "batchId",
        enableFilters: true,
      },
      {
        title: "Uploaded Date",
        id: "uploadedDate",
        enableFilters: false,
      },
      {
        title: "Payment Date",
        id: "paymentDate",
        enableFilters: false,
      },
      {
        title: "Bank Name",
        id: "bankName",
        enableFilters: false,
      },
      {
        title: "Bank Ref No",
        id: "bankRefNo",
        enableFilters: false,
      },
      {
        title: "Courier Name",
        id: "courierName",
        enableFilters: false,
      },
      {
        title: "Courier Inv No",
        id: "courierInvNo",
        enableFilters: false,
      },
      {
        title: "Batch Total",
        id: "batchTotal",
        enableFilters: false,
      },
      {
        title: "Comment",
        id: "comment",
        enableFilters: false,
      },
      {
        title: "Batch Status",
        id: "batchStatus",
        enableFilters: false,
      },
      {
        title: "Action",
        id: "action",
        enableFilters: false,
      },
    ],
    [fetchbulkPaymentsWithPagination]
  );

  const handleAprovedBatch = (data) => {
    setBatch(data);
    if (data.bankReferenceNumber === "") {
      setBankRefNoGet(true);
    }
    if (data.paymentProviderId === undefined) {
      setBankNameGet(true);
    }
    setBankInfoModal(true);
    setShowComment(false);
  };

  const approved = () => {
    setActionCalled(true);
    if (bankRefNoGet) {
      if (
        batch.bankReferenceNumber === "" ||
        batch.bankReferenceNumber === undefined
      ) {
        return showError("Bank Refrence Number is compulsory.");
      }
    }
    if (bankNameGet) {
      if (batch.paymentProviderId === undefined) {
        return showError("Please Select a Bank.");
      }
    }
    approveBatch(batch.id, batch)
      .then((res) => {
        dispatch(
          NotificationActions.successWithTimeout("Batch approved successfully!")
        );
        setBankInfoModal(false);
        setShowComment(false);
        setActionCalled(false);
        fetchbulkPaymentsWithPagination(
          10,
          bulkPaymentsPageNo,
          batchId,
          sortOrder,
          status,
          "COD"
        );
      })
      .catch((err) => {
        dispatch(
          NotificationActions.failureWithTimeout(
            err.response.data.message || "Network Error. Please try again!"
          )
        );
        setBankInfoModal(false);
        setShowComment(false);
        setActionCalled(false);
      });
  };

  const handleRejectedBatch = (data) => {
    setBatch(data);
    setShowComment(true);
    setBankInfoModal(false);
  };

  const reject = () => {
    setActionCalled(true);
    if (batch.comment === "" || batch.comment === undefined) {
      return showError(`Comment is compulsory.`);
    }
    rejectBatch(batch.id, batch)
      .then((res) => {
        dispatch(
          NotificationActions.successWithTimeout("Batch rejected successfully!")
        );
        fetchbulkPaymentsWithPagination(
          10,
          bulkPaymentsPageNo,
          batchId,
          sortOrder,
          status,
          "COD"
        );
        setBankInfoModal(false);
        setShowComment(false);
        setActionCalled(false);
      })
      .catch((err) => {
        dispatch(
          NotificationActions.failureWithTimeout(
            err.response.data.message || "Network Error. Please try again!"
          )
        );
        setBankInfoModal(false);
        setShowComment(false);
        setActionCalled(false);
      });
  };

  const showError = (message) => {
    props.dispatch(NotificationActions.failureWithTimeout(message));
    setActionCalled(false);
  };

  return (
    <div>
      <React.Fragment>
        <SweetAlert
          title={!bankNameGet && !bankRefNoGet ? "Are you sure?" : "Bank Info"}
          show={bankInfoModal}
          showCancel
          closeOnClickOutside={false}
          allowEscape={false}
          showCloseButton={true}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          confirmBtnCssClass="sweet-alert-confirm-button"
          cancelBtnCssClass="sweet-alert-cancle-button"
          onConfirm={() => {
            approved();
            setBankInfoModal(false);
            setShowComment(false);
          }}
          onCancel={() => {
            setBankInfoModal(false);
            setShowComment(false);
            setBankNameGet(false);
            setBankRefNoGet(false);
          }}
        >
          {(renderProps) => (
            <form>
              {bankNameGet && (
                <>
                  <hr />
                  <Select
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    value={paymentProviderOptions.find(
                      (c) => parseInt(c.value) === batch.paymentProviderId
                    )}
                    onChange={(o) =>
                      setBatch({
                        ...batch,
                        paymentProviderId: o.value,
                      })
                    }
                    options={paymentProviderOptions}
                  ></Select>
                  <br />
                </>
              )}
              <hr />
              {bankRefNoGet && (
                <>
                  <input
                    type="text"
                    className="form-control"
                    value={batch.bankReferenceNumber}
                    onChange={(e) =>
                      setBatch({
                        ...batch,
                        bankReferenceNumber: e.target.value,
                      })
                    }
                    placeholder={"Bank Reference Number"}
                  />
                  <br />
                </>
              )}
            </form>
          )}
        </SweetAlert>

        {showComment && (
          <SweetAlert
            show={showComment}
            showCancel
            closeOnClickOutside={false}
            allowEscape={false}
            showCloseButton={true}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            title="Enter comment"
            confirmBtnCssClass="sweet-alert-confirm-button"
            cancelBtnCssClass="sweet-alert-cancel-button"
            onConfirm={() => {
              setBankInfoModal(false);
              setShowComment(false);
              reject();
            }}
            onCancel={() => {
              setShowComment(false);
              setBankInfoModal(false);
            }}
          >
            {(renderProps) => (
              <form>
                <hr />
                <input
                  type="text"
                  className="form-control"
                  value={batch.comment}
                  onChange={(e) =>
                    setBatch({
                      ...batch,
                      comment: e.target.value,
                    })
                  }
                  placeholder={"Coment"}
                />
                <br />
              </form>
            )}
          </SweetAlert>
        )}
      </React.Fragment>
      <div className="row ma-0">
        <div className="col-lg-12 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-body">
              <DataTableBulkPayment
                title="Pending Payments"
                columns={columns}
                data={bulkPayment}
                totalCount={totalCount}
                bulkPaymentsPageLimit={rowPerPage}
                bulkPaymentsPageNo={bulkPaymentsPageNo}
                totalPages={totalPages}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onChangeFilter={onChangeFilter}
                batchId={batchId}
                handleAprovedBatch={handleAprovedBatch}
                handleRejectedBatch={handleRejectedBatch}
                actionCalled={actionCalled}
              ></DataTableBulkPayment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bulkPayments: state.payment.bulkPayments,
    bulkPaymentsPageLimit: state.payment.bulkPaymentsPageLimit,
    bulkPaymentsPageNo: state.payment.bulkPaymentsPageNo,
    bulkPaymentsTotal: state.payment.bulkPaymentsTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(PaymentActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkPaymentList);
