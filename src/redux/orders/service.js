import { axiosClient } from "redux/store";
import {
  OrderFieldUpdateUrl,
  OrderStatusUpdateUrl,
  OrderShipStatusUpdateUrl,
  OrderShipStatusCheckUrl,
  OrderHistoryUrl,
  OrderShippingChargesUrl,
  SwiftCouriersCitiesListUrl,
  CouriersListUrl,
  OrderReturnUrl,
  OrderByIdUrl,
  OrderDetailsById,
  CreateOrderUrl,
  OrderItemUrl,
  OrderPendingReturnUrl,
  OrdersByStatusUrl,
  OrdersByStatusUrlPagination,
  RefreshOrdersByStatusUrl,
  PaymentStatusUpdateUrl,
  PaymentUpdateUrl,
  BulkPaymentUrl,
  OrderItemUpdateUrl,
  OrderItemQuantityUrl,
  OrderItemLedgerUrl,
  OrdersByStatusUrlPackingList,
  OrderTaxUrl,
  OrderPaymentsDetails,
  FullFilmentUrl,
  GetFullFilmentUrl,
  UpdateQuantityIndicatorUrl,
  QuantityIndicatorUrl,
  OrderPutOrRemoveFromHold,
  orderBalancepaymentUrl,
  OrderCancelDefectedUrl,
  OrderBulkCancelUrl,
  CreateOrderBookingUrl,
} from "Constants";

export const orderById = (id) => {
  return axiosClient.get(OrderByIdUrl(id));
};

export const orderBalancepaymentFetch = (req) => {
  return axiosClient.post(orderBalancepaymentUrl, req);
};

export const trackingDetailById = (id) => {
  return axiosClient.get(OrderDetailsById(id));
};

export const ordersListByStatus = (status) => {
  return axiosClient.get(OrdersByStatusUrl(status));
};

export const ordersListByStatusPagination = (
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
  return axiosClient.get(
    OrdersByStatusUrlPagination(
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
  );
};

export const createNewOrder = (req) => {
  return axiosClient.post(CreateOrderUrl, req);
};

export const createNewOrderBooking = (orderId, request) => {
  return axiosClient.post(CreateOrderBookingUrl(orderId), request);
};

export const updateField = (id, payload) => {
  return axiosClient.put(OrderFieldUpdateUrl.replace("{id}", id), payload);
};

export const statusUpdate = (id, newStatus, refund) => {
  return axiosClient.put(OrderStatusUpdateUrl(id, refund), {
    newStatus: newStatus,
  });
};

export const shipStatusUpdate = (id) => {
  return axiosClient.put(OrderShipStatusUpdateUrl(id));
};

export const cancelStatusUpdate = (id, refund, payload) => {
  return axiosClient.post(OrderCancelDefectedUrl(id, refund), payload);
};

export const shipStatusCheck = (id) => {
  return axiosClient.get(OrderShipStatusCheckUrl(id));
};

export const paymentStatusUpdate = (req) => {
  return axiosClient.post(PaymentStatusUpdateUrl, req);
};

export const PaymentUpdate = (req) => {
  return axiosClient.post(PaymentUpdateUrl, req);
};

export const BulkPaymentUpload = (req) => {
  return axiosClient.post(BulkPaymentUrl, req);
};

export const fetchOrderPayments = (orderId) => {
  return axiosClient.get(OrderPaymentsDetails(orderId));
};

export const orderItemCollected = (id) => {
  return axiosClient.put(OrderItemUpdateUrl(id), { collected: true });
};

export const orderItemQuantityUpdate = (id, req) => {
  return axiosClient.put(OrderItemQuantityUrl(id), req);
};

export const fetchOrderHistory = (id) => {
  return axiosClient.get(OrderHistoryUrl(id));
};

export const updateOrderShippingCharges = (id, include) => {
  return axiosClient.post(OrderShippingChargesUrl(id, include));
};

export const getSwiftCouriersCities = () => {
  return axiosClient.get(SwiftCouriersCitiesListUrl);
};

export const getCouriersList = () => {
  return axiosClient.get(CouriersListUrl);
};

export const postFullFilmentDetails = (data) => {
  return axiosClient.post(FullFilmentUrl, data);
};

export const getFullFilmentDetails = () => {
  return axiosClient.get(GetFullFilmentUrl);
};

export const postQuantityIndicator = (data) => {
  return axiosClient.post(QuantityIndicatorUrl, data);
};
export const putQuantityIndicator = (data, id) => {
  return axiosClient.put(UpdateQuantityIndicatorUrl(id), data);
};

export const getQuantityIndicator = () => {
  return axiosClient.get(QuantityIndicatorUrl);
};

// export const postReturn = (oId, req) => {
//   return axiosClient.post(OrderReturnUrl(oId), req);
// };

export const putOrRemoveFromHold = (id, onHold) => {
  return axiosClient.put(OrderPutOrRemoveFromHold(id, onHold));
};

export const postReturn = (oId, req) => {
  return axiosClient.post(OrderReturnUrl(oId), req);
};

export const getPendingReturn = (oId, req) => {
  return axiosClient.get(OrderPendingReturnUrl(oId));
};

export const removeItem = (oId, req) => {
  return axiosClient.delete(OrderItemUrl(oId), { data: req });
};

export const addItem = (oId, req) => {
  return axiosClient.put(OrderItemUrl(oId), req);
};

export const orderItemLedger = (ids) => {
  return axiosClient.get(OrderItemLedgerUrl, {
    params: { orderItemIds: ids.join(",") },
  });
};

export const ordersListByStatusPackingList = (status) => {
  return axiosClient.get(OrdersByStatusUrlPackingList(status));
};

export const refreshOrdersListByStatus = (status) => {
  return axiosClient.get(RefreshOrdersByStatusUrl(status));
};

export const orderSaleTaxInvoice = (orderId) => {
  return axiosClient.get(OrderTaxUrl(orderId));
};

export const orderCreditNotes = (orderId) => {
  return axiosClient.get(OrderTaxUrl(orderId));
};

export const ordersBulkCancel = async (reqBody) => {
  return axiosClient.post(OrderBulkCancelUrl, reqBody);
};
