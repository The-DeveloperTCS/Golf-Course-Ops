import orderActions from "./actions";

const initState = {
  orders: [],
  total: null,
  pageLimit: null,
  pageNo: null,
  salesInvoice: null,
  creditNotes: null,
  order: null,
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case orderActions.ORDER_UPDATE:
      return {
        ...state,
        order: action.order,
      };
    case orderActions.ORDERS_FETCHED:
      const oldOrders = state.orders.filter(
        (a) => !action.orders.some((b) => a.id === b.id)
      );
      return {
        ...state,
        orders: [...oldOrders, ...action.orders],
        // .sort((a, b) => a.id - b.id),
      };

    case orderActions.ORDERS_FETCHED_PAGINATION:
      return {
        ...state,
        orders: [...action.orders],
        total: action.total,
        pageLimit: action.pageLimit,
        pageNo: action.pageNo,
      };
    case orderActions.ORDER_SALE_INVOICE:
      return {
        ...state,
        salesInvoice: action.salesInvoice,
      };
    case orderActions.ORDER_CREDIT_NOTES:
      return {
        ...state,
        creditNotes: action.creditNotes,
      };
    default:
      return state;
  }
}
