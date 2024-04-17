import bulkPaymentActions from "./actions";

const initState = {
  bulkPayments: [],
  bulkPaymentsTotal: null,
  bulkPaymentsPageLimit: null,
  bulkPaymentsPageNo: 1,
  requestedPayments: [],
  requestedPaymentsTotal: null,
  requestedPaymentsPageLimit: null,
  requestedPaymentsPageNo: 1,
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case bulkPaymentActions.BULK_PAYMENTS:
      return {
        ...state,
        bulkPayments: [...action.bulkPayments],
        bulkPaymentsTotal: action.bulkPaymentsTotal,
        bulkPaymentsPageLimit: action.bulkPaymentsPageLimit,
        bulkPaymentsPageNo: action.bulkPaymentsPageNo,
      };
    case bulkPaymentActions.REQUESTED_PAYMENTS:
      return {
        ...state,
        requestedPayments: [...action.requestedPayments],
        requestedPaymentsTotal: action.requestedPaymentsTotal,
        requestedPaymentsPageLimit: action.requestedPaymentsPageLimit,
        requestedPaymentsPageNo: action.requestedPaymentsPageNo,
      };
    default:
      return state;
  }
}
