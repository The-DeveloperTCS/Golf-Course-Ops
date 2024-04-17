import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PaymentActions from "redux/payment/actions";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import DataTableRequestedPayments from "components/table/DataTableRequestedPayments";
import { useDispatch } from "react-redux";
import { approveBatch, rejectBatch } from "redux/payment/service";
import SweetAlert from "react-bootstrap-sweetalert";

const BulkPaymentList = (props) => {
  const {
    requestedPayments,
    fetchPaymentsrequestsWithPagination,
    requestedPaymentsPageLimit,
    requestedPaymentsPageNo,
    requestedPaymentsTotal,
  } = props;
  const dispatch = useDispatch();
  const [rowPerPage, setRowPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [batchId, setBatchId] = useState("");
  const [sortOrder, setSortOrder] = useState("2");
  const [status, setStatus] = useState("");
  const [requestedPayment, setRequestedPayment] = useState([]);
  const [bankInfoModal, setBankInfoModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [actionCalled, setActionCalled] = useState(false);
  const [batch, setBatch] = useState();

  useEffect(() => {
    setRequestedPayment(requestedPayments);
  }, [requestedPayments]);

  useEffect(() => {
    window.scrollTo(200, 500);
    setBatchId("");
    setSortOrder("2");
    setStatus("");
    fetchPaymentsrequestsWithPagination(
      10,
      requestedPaymentsPageNo ? requestedPaymentsPageNo : 1,
      batchId,
      sortOrder,
      status,
      "ADVANCE"
    );
  }, []);

  useEffect(() => {
    setRowPerPage(requestedPaymentsPageLimit);
    setTotalCount(requestedPaymentsTotal);
    setTotalPages(
      Math.ceil(requestedPaymentsTotal / requestedPaymentsPageLimit)
    );
  }, [
    requestedPaymentsTotal,
    requestedPaymentsPageLimit,
    requestedPaymentsPageNo,
  ]);

  const handleChangePage = (event) => {
    fetchPaymentsrequestsWithPagination(
      requestedPaymentsPageLimit,
      event,
      batchId,
      sortOrder,
      status,
      "ADVANCE"
    );
  };

  const handleChangeRowsPerPage = (event) => {
    fetchPaymentsrequestsWithPagination(
      event.target.value,
      requestedPaymentsPageNo
    );
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
        fetchPaymentsrequestsWithPagination(
          10,
          1,
          batchId,
          sortOrder,
          status,
          "ADVANCE"
        );
      } else {
        fetchPaymentsrequestsWithPagination(
          10,
          requestedPaymentsPageNo,
          batchId,
          sortOrder,
          status,
          "ADVANCE"
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
        title: "Attachment",
        id: "attachment",
        enableFilters: false,
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
        title: "Batch Total",
        id: "batchTotal",
        enableFilters: false,
      },
      {
        title: "Action",
        id: "action",
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
    []
  );

  const handleAprovedBatch = (data) => {
    setBatch(data);
    setBankInfoModal(true);
    setShowComment(false);
  };

  const approved = () => {
    setActionCalled(true);
    if (
      batch.bankReferenceNumber === "" ||
      batch.bankReferenceNumber === undefined
    ) {
      return showError("Bank Refrence Number is compulsory.");
    }
    approveBatch(batch.id, batch)
      .then((res) => {
        dispatch(
          NotificationActions.successWithTimeout("Batch approved successfully!")
        );
        setBankInfoModal(false);
        setShowComment(false);
        setActionCalled(false);
        fetchPaymentsrequestsWithPagination(
          10,
          requestedPaymentsPageNo,
          batchId,
          sortOrder,
          status,
          "ADVANCE"
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
        fetchPaymentsrequestsWithPagination(
          10,
          requestedPaymentsPageNo,
          batchId,
          sortOrder,
          status,
          "ADVANCE"
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
          title={"Bank Info"}
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
          }}
        >
          {(renderProps) => (
            <form>
              <hr />
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
              <DataTableRequestedPayments
                title="Requested Payments"
                columns={columns}
                data={requestedPayment}
                totalCount={totalCount}
                requestedPaymentsPageLimit={rowPerPage}
                requestedPaymentsPageNo={requestedPaymentsPageNo}
                totalPages={totalPages}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onChangeFilter={onChangeFilter}
                batchId={batchId}
                handleAprovedBatch={handleAprovedBatch}
                handleRejectedBatch={handleRejectedBatch}
                actionCalled={actionCalled}
              ></DataTableRequestedPayments>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    requestedPayments: state.payment.requestedPayments,
    requestedPaymentsPageLimit: state.payment.requestedPaymentsPageLimit,
    requestedPaymentsPageNo: state.payment.requestedPaymentsPageNo,
    requestedPaymentsTotal: state.payment.requestedPaymentsTotal,
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
