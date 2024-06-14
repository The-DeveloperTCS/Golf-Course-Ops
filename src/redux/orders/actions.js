import notificationActions from "redux/notifications/actions";
import {
  ordersListByStatusPagination,
  // updateField,
  // removeItem,
  // addItem,
  // ordersListByStatus,
  // ordersListByStatusPackingList,
  // refreshOrdersListByStatus,
  // orderSaleTaxInvoice,
  // orderCreditNotes,
} from "./service";
// import loaderAction from "../loader/actions";

const EmployeeActions = {
  ORDER_UPDATE: "orders/updated",
  ORDERS_FETCHED: "orders/fetched",
  ORDER_SALE_INVOICE: "orders/sale-invoice",
  ORDER_CREDIT_NOTES: "orders/credit-notes",
  ORDERS_FETCHED_PAGINATION: "orders/fetched/pagination",
  FAILURE: "orders/failure",

  // orderUpdated: (data) => {
  //   return {
  //     type: EmployeeActions.ORDER_UPDATE,
  //     order: data,
  //   };
  // },

  // ordersFetched: (data) => {
  //   return {
  //     type: EmployeeActions.ORDERS_FETCHED,
  //     orders: data.map((d) => {
  //       d.status = toOrderStatus(d.statusId);
  //       return d;
  //     }),
  //   };
  // },

  // ordersFetchedPagination: (data) => {
  //   return {
  //     type: EmployeeActions.ORDERS_FETCHED_PAGINATION,
  //     orders: data.list.map((d) => {
  //       d.status = toOrderStatus(d.statusId);
  //       return d;
  //     }),
  //     total: data.count,
  //     pageLimit: data.limit,
  //     pageNo: data.page,
  //   };
  // },

  // ordersFetchedPacking: (data) => {
  //   return {
  //     type: EmployeeActions.ORDERS_FETCHED,
  //     orders: data.map((d) => {
  //       d.status = toOrderStatus(d.statusId);
  //       return d;
  //     }),
  //   };
  // },

  // orderSalesInvoice: (data) => {
  //   return {
  //     type: EmployeeActions.ORDER_SALE_INVOICE,
  //     salesInvoice: data,
  //   };
  // },

  // orderCreditNote: (data) => {
  //   return {
  //     type: EmployeeActions.ORDER_CREDIT_NOTES,
  //     creditNotes: data,
  //   };
  // },

  // loaderOff: () => {
  //   return {
  //     type: loaderAction.END,
  //     loader: false,
  //   };
  // },

  // addOrderItem: (oId, data) => {
  //   return (dispatch) => {
  //     addItem(oId, data)
  //       .then((res) => {
  //         dispatch(EmployeeActions.orderUpdated(res.data));
  //         dispatch(
  //           notificationActions.successWithTimeout(
  //             "Order item added successfully!"
  //           )
  //         );
  //       })
  //       .catch((err) => {
  //         dispatch(notificationActions.failure(err.response.data.message));
  //       });
  //   };
  // },

  // removeOrderItem: (oId, data) => {
  //   return (dispatch) => {
  //     removeItem(oId, data)
  //       .then((res) => {
  //         dispatch(EmployeeActions.orderUpdated(res.data));
  //         dispatch(
  //           notificationActions.successWithTimeout(
  //             "Order item removed successfully!"
  //           )
  //         );
  //       })
  //       .catch((err) => {
  //         dispatch(notificationActions.failure(err.response.data.message));
  //       });
  //   };
  // },

  // updateField: (data) => {
  //   return (dispatch) => {
  //     updateField(data.id, {
  //       field: data.field,
  //       value: data.value,
  //     })
  //       .then((res) => {
  //         dispatch(EmployeeActions.orderUpdated(res.data));
  //         dispatch(
  //           notificationActions.successWithTimeout(
  //             "Order updated successfully!"
  //           )
  //         );
  //       })
  //       .catch((err) => {
  //         console.log(err, "error mgs");
  //         dispatch(notificationActions.failure(err.response.data.message));
  //       });
  //   };
  // },

  fetchOrderByStatusPagination: (
    status,
    limit,
    pageNo,
    orderId,
    searchMerchant,
    searchCustomer,
    searchSalesAgent,
    searchDate,
    sortOn,
    sortOrder,
    filter
  ) => {
    return (dispatch) => {
      ordersListByStatusPagination(
        status,
        limit,
        pageNo,
        orderId,
        searchMerchant,
        searchCustomer,
        searchSalesAgent,
        searchDate,
        sortOn,
        sortOrder,
        filter
      )
        .then((res) => {
          dispatch(EmployeeActions.ordersFetchedPagination(res.data));
          dispatch(EmployeeActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: EmployeeActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(EmployeeActions.loaderOff());
        });
    };
  },

  // refreshOrderByStatus: (status) => {
  //   return (dispatch) => {
  //     refreshOrdersListByStatus(status)
  //       .then((res) => {
  //         dispatch(EmployeeActions.ordersFetched(res.data));
  //         dispatch(EmployeeActions.loaderOff());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch({
  //           type: EmployeeActions.FAILURE,
  //           message: err.message,
  //         });
  //         dispatch(notificationActions.failure(err.response.data.message));
  //         dispatch(EmployeeActions.loaderOff());
  //       });
  //   };
  // },

  // fetchOrderByStatusPackingList: (status) => {
  //   return (dispatch) => {
  //     ordersListByStatusPackingList(status)
  //       .then((res) => {
  //         dispatch(EmployeeActions.ordersFetchedPacking(res.data));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch({
  //           type: EmployeeActions.FAILURE,
  //           message: err.message,
  //         });
  //       });
  //   };
  // },

  // fetchOrderByStatus: (status) => {
  //   return (dispatch) => {
  //     ordersListByStatus(status)
  //       .then((res) => {
  //         dispatch(EmployeeActions.ordersFetched(res.data));
  //         dispatch(EmployeeActions.loaderOff());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch({
  //           type: EmployeeActions.FAILURE,
  //           message: err.message,
  //         });
  //         dispatch(notificationActions.failure(err.response.data.message));
  //         dispatch(EmployeeActions.loaderOff());
  //       });
  //   };
  // },

  // fetchOrderSaleInvoicesForTax: (orderId) => {
  //   return (dispatch) => {
  //     orderSaleTaxInvoice(orderId)
  //       .then((res) => {
  //         dispatch(EmployeeActions.orderSalesInvoice(res.data));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch({
  //           type: EmployeeActions.FAILURE,
  //           message: err.response.data.message,
  //         });
  //       });
  //   };
  // },

  // fetchOrderCreditNotesForTax: (orderId) => {
  //   return (dispatch) => {
  //     orderCreditNotes(orderId)
  //       .then((res) => {
  //         dispatch(EmployeeActions.orderCreditNote(res.data));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch({
  //           type: EmployeeActions.FAILURE,
  //           message: err.response.data.message,
  //         });
  //       });
  //   };
  // },
};

// const toOrderStatus = (id) => {
//   switch (id) {
//     case 0:
//       return "Pending";
//     case 1:
//       return "Placed";
//     case 2:
//       return "Confirmed";
//     case 3:
//       return "Processing";
//     case 4:
//       return "Shipped";
//     case 5:
//       return "Delivered";
//     case 6:
//       return "Cancelled";
//     case 7:
//       return "Returned";
//     default:
//       return id + "";
//   }
// };

export default EmployeeActions;
