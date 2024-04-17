import { bulkPaymentsList } from "./service";

const paymentActions = {
  BULK_PAYMENTS: "bulk-payments/fetched",
  REQUESTED_PAYMENTS: "requested-payments/fetched",

  fetchBulkPayments: (data) => {
    return {
      type: paymentActions.BULK_PAYMENTS,
      bulkPayments: data.content,
      bulkPaymentsTotal: data.totalElements,
      bulkPaymentsPageLimit: data.size,
      bulkPaymentsPageNo: data.number + 1,
    };
  },

  fetchPaymentsRequest: (data) => {
    return {
      type: paymentActions.REQUESTED_PAYMENTS,
      requestedPayments: data.content,
      requestedPaymentsTotal: data.totalElements,
      requestedPaymentsPageLimit: data.size,
      requestedPaymentsPageNo: data.number + 1,
    };
  },

  fetchbulkPaymentsWithPagination: (
    limit,
    pageNo,
    batchId,
    sortOrder,
    status,
    type
  ) => {
    return (dispatch) => {
      bulkPaymentsList(limit, pageNo, batchId, sortOrder, status, type)
        .then((res) => {
          dispatch(paymentActions.fetchBulkPayments(res.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: paymentActions.FAILURE,
            message: err.message,
          });
        });
    };
  },

  fetchPaymentsrequestsWithPagination: (
    limit,
    pageNo,
    batchId,
    sortOrder,
    status,
    type
  ) => {
    return (dispatch) => {
      bulkPaymentsList(limit, pageNo, batchId, sortOrder, status, type)
        .then((res) => {
          dispatch(paymentActions.fetchPaymentsRequest(res.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: paymentActions.FAILURE,
            message: err.message,
          });
        });
    };
  },
};

export default paymentActions;
