import axios from "axios";

//export const BaseUrl = "https://api.traveling-partner.com/api/";

//export const BaseUrl = "https://http://localhost:3000/";

// export const SENTRY_DSN = process.env.SENTRY_DSN;

//export const LoginUrl = BaseUrl + "user/login";

//export const LoginUrl = "http://localhost:3000/user/login";
//export const PermissionsUrl = "http://localhost:3000/permission/byRole";

//export const LoginOTPUrl = BaseUrl + "loginVerify";

export const BaseUrl = "http://localhost:3000";

export const LoginUrl = BaseUrl + "user/login";
export const PermissionsUrl = BaseUrl + "permission/byRole";
export const LoginOTPUrl = BaseUrl + "loginVerify";

//export const PermissionsUrl = "http://localhost:3000/permission/byRole";

//export const PermissionsUrl = BaseUrl + "authz/permission";

//Employee Endpoints

const createEmployee = (data) => axios.post(`${BaseUrl}/employee/add`, data);
const updateEmployee = (id, data) =>
  axios.put(`${BaseUrl}/employee/update/${id}`, data);
const deleteEmployee = (id) => axios.delete(`${BaseUrl}/employee/delete/${id}`);
const getEmployeesList = (params) =>
  axios.get(`${BaseUrl}/employee/getAll`, { params });
const getSpecificEmployee = (id, data) =>
  axios.get(`${BaseUrl}/employee/specificId/${id}`, data);
const loginUser = (data) => axios.post(LoginUrl, data);

//Location Endpoints

const createLocation = (data) => axios.post(`${BaseUrl}/location/add`, data);
const updateLocation = (id, data) =>
  axios.put(`${BaseUrl}/location/update/${id}`, data);
const deleteLocation = (id) => axios.delete(`${BaseUrl}/location/delete/${id}`);
const getLocationList = (params) =>
  axios.get(`${BaseUrl}/location/getAll`, { params });
const getSpecificLocation = (id, data) =>
  axios.get(`${BaseUrl}/location/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Inventory Endpoints

const createInventory = (data) => axios.post(`${BaseUrl}/inventory/add`, data);
const updateInventory = (id, data) =>
  axios.put(`${BaseUrl}/inventory/update/${id}`, data);
const deleteInventory = (id) =>
  axios.delete(`${BaseUrl}/inventory/delete/${id}`);
const getInventoryList = (params) =>
  axios.get(`${BaseUrl}/inventory/getAll`, { params });
const getSpecificInventory = (id, data) =>
  axios.get(`${BaseUrl}/inventory/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Cart Endpoints

const createCart = (data) => axios.post(`${BaseUrl}/cart/add`, data);
const updateCart = (id, data) =>
  axios.put(`${BaseUrl}/cart/update/${id}`, data);
const deleteCart = (id) => axios.delete(`${BaseUrl}/cart/delete/${id}`);
const getCartList = (params) => axios.get(`${BaseUrl}/cart/getAll`, { params });
const getSpecificCart = (id, data) =>
  axios.get(`${BaseUrl}/cart/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Department Endpoints

const createDepartment = (data) =>
  axios.post(`${BaseUrl}/department/add`, data);
const updateDepartment = (id, data) =>
  axios.put(`${BaseUrl}/department/update/${id}`, data);
const deleteDepartment = (id) =>
  axios.delete(`${BaseUrl}/department/delete/${id}`);
const getDepartmentList = (params) =>
  axios.get(`${BaseUrl}/department/getAll`, { params });
const getSpecificDepartment = (id, data) =>
  axios.get(`${BaseUrl}/department/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//GiftCard Endpoints

const createGiftCard = (data) => axios.post(`${BaseUrl}/gift-card/add`, data);
const updateGiftCard = (id, data) =>
  axios.put(`${BaseUrl}/gift-card/update/${id}`, data);
const deleteGiftCard = (id) =>
  axios.delete(`${BaseUrl}/gift-card/delete/${id}`);
const getGiftCardList = (params) =>
  axios.get(`${BaseUrl}/gift-card/getAll`, { params });
const getSpecificGiftCard = (id, data) =>
  axios.get(`${BaseUrl}/gift-card/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Customer Endpoints

const createCustomer = (data) => axios.post(`${BaseUrl}/customer/add`, data);
const updateCustomer = (id, data) =>
  axios.put(`${BaseUrl}/customer/update/${id}`, data);
const deleteCustomer = (id) => axios.delete(`${BaseUrl}/customer/delete/${id}`);
const getCustomerList = (params) =>
  axios.get(`${BaseUrl}/customer/getAll`, { params });
const getSpecificCustomer = (id, data) =>
  axios.get(`${BaseUrl}/customer/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Terminal Endpoints

const createTerminal = (data) => axios.post(`${BaseUrl}/terminal/add`, data);
const updateTerminal = (id, data) =>
  axios.put(`${BaseUrl}/terminal/update/${id}`, data);
const deleteTerminal = (id) => axios.delete(`${BaseUrl}/terminal/delete/${id}`);
const getTerminalList = (params) =>
  axios.get(`${BaseUrl}/terminal/getAll`, { params });
const getSpecificTerminal = (id, data) =>
  axios.get(`${BaseUrl}/terminal/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Group Endpoints

const createGroup = (data) => axios.post(`${BaseUrl}/group/add`, data);
const updateGroup = (id, data) =>
  axios.put(`${BaseUrl}/group/update/${id}`, data);
const deleteGroup = (id) => axios.delete(`${BaseUrl}/group/delete/${id}`);
const getGroupList = (params) =>
  axios.get(`${BaseUrl}/group/getAll`, { params });
const getSpecificGroup = (id, data) =>
  axios.get(`${BaseUrl}/group/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//User Endpoints

const createUser = (data) => axios.post(`${BaseUrl}/user/add`, data);
const updateUser = (id, data) =>
  axios.put(`${BaseUrl}/user/update/${id}`, data);
const deleteUser = (id) => axios.delete(`${BaseUrl}/user/delete/${id}`);
const getUserList = (params) => axios.get(`${BaseUrl}/user/getAll`, { params });
const getSpecificUser = (id, data) =>
  axios.get(`${BaseUrl}/user/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Category Endpoints

const createCategory = (data) => axios.post(`${BaseUrl}/category/add`, data);
const updateCategory = (id, data) =>
  axios.put(`${BaseUrl}/category/update/${id}`, data);
const deleteCategory = (id) => axios.delete(`${BaseUrl}/category/delete/${id}`);
const getCategoryList = (params) =>
  axios.get(`${BaseUrl}/category/getAll`, { params });
const getSpecificCategory = (id, data) =>
  axios.get(`${BaseUrl}/category/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//SubCategory Endpoints

const createSubCategory = (data) =>
  axios.post(`${BaseUrl}/sub-category/add`, data);
const updateSubCategory = (id, data) =>
  axios.put(`${BaseUrl}/sub-category/update/${id}`, data);
const deleteSubCategory = (id) =>
  axios.delete(`${BaseUrl}/sub-category/delete/${id}`);
const getSubCategoryList = (params) =>
  axios.get(`${BaseUrl}/sub-category/getAll`, { params });
const getSpecificSubCategory = (id, data) =>
  axios.get(`${BaseUrl}/sub-category/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Permission Endpoints

const createPermission = (data) =>
  axios.post(`${BaseUrl}/permission/add`, data);
const updatePermission = (id, data) =>
  axios.put(`${BaseUrl}/permission/update/${id}`, data);
const deletePermission = (id) =>
  axios.delete(`${BaseUrl}/permission/delete/${id}`);
const getPermissionList = (params) =>
  axios.get(`${BaseUrl}/permission/getAll`, { params });
const getSpecificPermission = (id, data) =>
  axios.get(`${BaseUrl}/permission/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Role Endpoints

const createRole = (data) => axios.post(`${BaseUrl}/role/add`, data);
const updateRole = (id, data) =>
  axios.put(`${BaseUrl}/role/update/${id}`, data);
const deleteRole = (id) => axios.delete(`${BaseUrl}/role/delete/${id}`);
const getRoleList = (params) => axios.get(`${BaseUrl}/role/getAll`, { params });
const getSpecificRole = (id, data) =>
  axios.get(`${BaseUrl}/role/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Role Endpoints

const createPermissionByRole = (data) =>
  axios.post(`${BaseUrl}/role/add`, data);
const updatePermissionByRole = (id, data) =>
  axios.put(`${BaseUrl}/role/update/${id}`, data);
const deletePermissionByRole = (id) =>
  axios.delete(`${BaseUrl}/role/delete/${id}`);
const getPermissionByRoleList = (params) =>
  axios.get(`${BaseUrl}/role/getAll`, { params });
const getSpecificPermissionByRole = (id, data) =>
  axios.get(`${BaseUrl}/role/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

//Supplier Endpoints

const createSupplier = (data) => axios.post(`${BaseUrl}/supplier/add`, data);
const updateSupplier = (id, data) =>
  axios.put(`${BaseUrl}/supplier/update/${id}`, data);
const deleteSupplier = (id) => axios.delete(`${BaseUrl}/supplier/delete/${id}`);
const getSupplierList = (params) =>
  axios.get(`${BaseUrl}/supplier/getAll`, { params });
const getSpecificSupplier = (id, data) =>
  axios.get(`${BaseUrl}/supplier/specificId/${id}`, data);
//const loginUser = (data) => axios.post(LoginUrl, data);

export const CreateOrderUrl = BaseUrl + "order/full";
export const OrderByIdUrl = (id) => BaseUrl + `order/${id}`;
export const OrderItemUrl = (id) => BaseUrl + `order/${id}/item`;
export const OrderItemUpdateUrl = (id) => BaseUrl + `order/item/${id}`;
export const OrderPaymentsDetails = (id) => BaseUrl + `order/payment/${id}`;
export const OrderDetailsById = (id) => BaseUrl + `order/track/${id}`;
export const OrderItemQuantityUrl = (id) => BaseUrl + `order/${id}/item/update`;

export const VendorsUrl = BaseUrl + "vendors";
export const SuppliersUrl = BaseUrl + "suppliers";
export const UpdateSuppliersUrl = (id) => BaseUrl + `suppliers/${id}`;

export const BrandsUrl = BaseUrl + "brands";
export const AddBrandUrl = BaseUrl + "brand";
export const UpdateBrandUrl = (id) => BaseUrl + `brand/${id}`;

export const SectionsUrl = BaseUrl + "sections";
export const TagsUrl = BaseUrl + "tags";
export const AddTagUrl = BaseUrl + "tag";
export const UpdateTagUrl = (id) => BaseUrl + `tag/${id}`;
export const UploadFileUrl = BaseUrl + "upload-image";
export const UploadImageDigitalOcean = BaseUrl + "upload";

export const ItemLocationsUrlv2 = BaseUrl + "v2/item/locations";
export const ItemLedgerUrl = (id) => BaseUrl + `item/${id}/ledger`;
export const OrderItemLedgerUrl = BaseUrl + `order/item/ledger`;

export const ItemsUrl = BaseUrl + "items";
export const SetsUrl = BaseUrl + "items";

export const OrderFieldUpdateUrl = BaseUrl + "order/{id}";
export const OrderStatusUpdateUrl = (id, refund) =>
  BaseUrl + `order/${id}/status?refund=${refund}`;

export const OrderCancelDefectedUrl = (id, refund) =>
  BaseUrl + `order/${id}/item/defected?refund=${refund}`;
export const OrderPutOrRemoveFromHold = (id, onHold) =>
  BaseUrl + `order/${id}/hold?onHold=${onHold}`;

export const OrderShipStatusUpdateUrl = (id) => BaseUrl + `order/${id}/ship`;
export const OrderShipStatusCheckUrl = (id) =>
  BaseUrl + `order/shipping/status?orderId=${id}`;

export const OrderHistoryUrl = (id) => BaseUrl + `order/${id}/history`;
export const OrderShippingChargesUrl = (id, include) =>
  BaseUrl + `order/${id}/shipping-charges?include=${include}`;
// export const OrderReturnUrl = (id) => BaseUrl + `order/${id}/return`;
export const OrderReturnUrl = (id) => BaseUrl + `order/${id}/item/return`;

export const SwiftCouriersCitiesListUrl =
  "https://vendor-api.swyftlogistics.com:3000/api/Cities";

export const CouriersListUrl = BaseUrl + "order/couriers";
export const FullFilmentUrl = BaseUrl + "merchant/auto/confirmation/save";
export const GetFullFilmentUrl = BaseUrl + "merchant/auto/confirmation/latest";
export const REWARDURL = BaseUrl + "system/reward";
export const UPDATEREWARDURL = (id) => BaseUrl + `system/reward/${id}`;
export const REWARDSTYPEURL = BaseUrl + `system/reward/types`;

export const UpdateQuantityIndicatorUrl = (id) =>
  BaseUrl + `item/quantity/indicator/${id}`;
export const QuantityIndicatorUrl = BaseUrl + "item/quantity/indicator";

export const PaymentStatusUpdateUrl = BaseUrl + "order/payment-status/V2";
export const orderBalancepaymentUrl = BaseUrl + "order/payment/balance";

export const PaymentUpdateUrl = BaseUrl + "order/payment";
export const BulkPaymentUrl = BaseUrl + "payments/batch/add";

export const FreeDeliveryUrl = BaseUrl + "order/free/delivery";

export const RefreshTokenUrl = BaseUrl + "refresh-token";

//get all merchantdiser
export const MerchandisersUrl = BaseUrl + "merchandisers";
export const MerchantsUrl = BaseUrl + "user/merchants";
// export const MerchantsWithPhone = BaseUrl + `/user/merchantsV2?keyword=${number}`;
export const MerchantByPhone = (number) =>
  BaseUrl + `user/merchantsV2?keyword=${number}`;
export const ShopsUrl = BaseUrl + "shops";
export const SectionsAsShopUrl = (id) => BaseUrl + `sections/${id}`;

export const SaleAgentsByPhone = () => BaseUrl + `user/merchantsV3`;

export const MerchantUpdateUrl = BaseUrl + "user/{id}";
export const MerchantsByUserUrl = (ids) =>
  BaseUrl + `user/${ids.join(",")}/merchants`;
export const MerchantByUserIdUrl = (id) => BaseUrl + `user/${id}/merchants`;
export const MerchantByIdUrl = (id) => BaseUrl + `user/merchant/${id}`;
export const MerchantsByIds = (ids) => BaseUrl + `user/merchant/${ids}`;
export const MerchantsForPreview = BaseUrl + `user/merchant/preview`;
export const MerchantsActivityByIds = (ids) =>
  BaseUrl + `user/${ids}/activity/merchants`;
export const MerchantsRewardsByIds = (id) =>
  BaseUrl + `user/reward/all?merchantId=${id}`;
export const getAllSystemReward = BaseUrl + `system/reward`;
export const RewardAddMerchant = BaseUrl + "user/reward/gift";

export const UserRolesUrl = (userId) => BaseUrl + `user/${userId}/roles`;
export const MerchantHistoryUrl = (id) => BaseUrl + `user/${id}/history`;
export const MerchantOrderHistory = (id) =>
  BaseUrl + `order/merchant/${id}/all`;
export const MerchantProfitLedger = (id) =>
  BaseUrl + `merchant/payment?merchantId=${id}&statusId=`;
export const ProfitProcessUrl = BaseUrl + "merchant/profit-process";
export const PendingProfitProccesUrl = BaseUrl + "merchant/profit";
export const ProfitStockUrl = BaseUrl + "merchant/profit-update";

export const CategoriesUrl = BaseUrl + "category?all=true";
export const CategoryItemsUrl = BaseUrl + "category/{id}/items?all=true";
export const ItemUpdateUrl = BaseUrl + "item/{id}";
export const SetUpdateUrl = BaseUrl + "set/{id}";
export const ItemImagesUploadUrl = BaseUrl + "item/images";
export const ItemPriceChangedUrl = BaseUrl + "items/updatePrice";

export const CampaignsUrl = BaseUrl + "campaigns";
export const AddCampaignUrl = BaseUrl + "campaigns/create";
export const CampaignUpdateUrl = BaseUrl + "campaigns/{id}";
export const CampaignItemAddUrl = BaseUrl + "campaigns/{id}/addItems";
export const CampaignItemRemoveUrl = (id) =>
  BaseUrl + `campaigns/${id}/removeItems`;

export const CampaignItemsUrl = (id, limit, pageNo) =>
  BaseUrl + `campaigns/${id}/items?id=${id}&page=${pageNo}&limit=${limit}`;
export const ItemCampaignsUrl = (id) => BaseUrl + `campaigns/items/${id}`;
export const CampaignItemCountUrl = BaseUrl + "campaigns/{id}/validateItems";
export const CampaignItemsListUrl = (id) =>
  BaseUrl + `campaigns/${id}/items/originalPrice`;

export const ItemBulkUpdateUrl = BaseUrl + "item/bulk/{id}";
export const ItemBulkUploadUrl = BaseUrl + "item/bulk";
export const ItemHistoryUrl = (id) => BaseUrl + `item/${id}/history`;
export const SetHistoryUrl = (id) => BaseUrl + `item/${id}/history`;

export const BannersUrl = BaseUrl + "banners/home";

export const ItemsByPaginationUrl = (
  categoryId,
  limit,
  pageNo,
  itemId,
  searchItemName,
  searchItemDescription,
  brandNameSerach,
  itemStatus,
  itemSku,
  sortOn,
  sortOrder
) =>
  BaseUrl +
  `category/${categoryId}/itemsV2?all=true&itemId=${itemId}&itemName=${searchItemName}&description=${searchItemDescription}&brandId=${brandNameSerach}&statusId=${itemStatus}&supplierSku=${itemSku}&page=${pageNo}&limit=${limit}&sortOn=${sortOn}&sortOrder=${sortOrder}`;
export const SEARCH_ITEMS_URL = (
  limit,
  pageNo,
  itemId,
  searchItemName,
  searchItemDescription,
  brandNameSerach,
  itemStatus,
  itemSku,
  sortOn,
  sortOrder
) =>
  BaseUrl +
  `items/search?itemId=${itemId}&itemName=${searchItemName}&description=${searchItemDescription}&brandId=${brandNameSerach}&statusId=${itemStatus}&supplierSku=${itemSku}&page=${pageNo}&limit=${limit}&sortOn=${sortOn}&sortOrder=${sortOrder}`;

export const ItemAddUrl = BaseUrl + "item";
export const SetAddUrl = BaseUrl + "set";

export const UnreleasedItemsUrl = (limit, pageNo, itemId, type) => {
  return (
    BaseUrl +
    `items/all?itemId=${itemId}&unreleased=${type}&page=${pageNo}&size=${limit}`
  );
};
export const ReleaseItemsUrl = (ids) =>
  BaseUrl + `items/release?itemIds=${ids}`;
export const ReleaseItemLaterUrl = (ids, title, releaseDate, description) =>
  BaseUrl +
  `items/release?itemIds=${ids}&title=${title}&releaseDate=${releaseDate}&description=${description}`;
export const GetAllScheduleReleaseItemUrl =
  BaseUrl + `items/releases/batch/all`;
export const ScheduleReleaseItemDeleteUrl = (id) =>
  BaseUrl + `items/releases/batch/${id}`;

export const CategorySortUrl = (cId) => BaseUrl + `category/${cId}`;

export const ItemVideoUrl =
  "https://stingray-app-ovw42.ondigitalocean.app/video";

export const SetVideoUrl =
  "https://stingray-app-ovw42.ondigitalocean.app/video";

export const CategoryVideoUrl =
  "https://stingray-app-ovw42.ondigitalocean.app/category/videos";

export const CategoryUpdateUrl = BaseUrl + "category/{id}";
export const AddCategoryUrl = BaseUrl + "category";
// “/item/bulk/{id}”
export const ImageUploadUrl = BaseUrl + "upload-image";

export const ReturnsUrl = BaseUrl + "returns";
export const ReturnsByIdUrl = (id) => BaseUrl + `returns/${id}`;
// export const OrderPendingReturnUrl = (id) =>
//   BaseUrl + `order/${id}/pending-return`;
export const OrderPendingReturnUrl = (id) =>
  BaseUrl + `order/${id}/item/return/pending`;
export const OrdersByStatusUrl = (status) => BaseUrl + `order/status/${status}`;
export const OrdersByStatusUrlPagination = (
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
) =>
  BaseUrl +
  `order/v4/status/${status}?limit=${limit}&page=${pageNo}&orderId=${orderId}&merchant=${searchMerchant}&customer=${searchCustomer}&salesAgent=${searchSalesAgent}&placedDate=${searchDate}&sortOn=${sortOn}&sortOrder=${sortOrder}&filter=${filter}`;

// `order/statusV3/${status}?limit=${limit}&page=${pageNo}&orderId=${orderId}&merchant=${searchMerchant}&customer=${searchCustomer}&salesAgent=${searchSalesAgent}&placedDate=${searchDate}&sortOn=${sortOn}&sortOrder=${sortOrder}`;

// localhost:8080/order/statusV3/Cancelled?limit=25&page=1&orderId=&merchant=&customer=&salesAgent=03443729894&sortOrder=2&placedDate=2022-05-24
export const OrdersByStatusUrlPackingList = (status) =>
  BaseUrl + `order/packinglist/${status}`;

export const OrderTaxUrl = (orderId) => BaseUrl + `order/invoice/${orderId}`;

export const OrderBulkCancelUrl = BaseUrl + "order/bulk-cancel";

export const RefreshOrdersByStatusUrl = (status) =>
  BaseUrl + `order/refresh/${status}`;

export const PurchaseOrderAddUrl = BaseUrl + "po/create";
export const PurchaseOrderupdateUrl = (id) => BaseUrl + `po/update/${id}`;
export const PurchaseOrderItemUpdateUrl = (id) =>
  BaseUrl + `po/item/update/${id}`;
export const PurchaseOrderDetailsUrl = (id) => BaseUrl + `po/${id}`;
export const PurchaseOrderByNumberDetailsUrl = (number) =>
  BaseUrl + `po/find/${number}`;
export const PurchaseOrderCloseUrl = (id) => BaseUrl + `po/close/${id}`;
export const PURCHASE_ORDER_VOID_URL = (id) => BaseUrl + `po/void/${id}`;
export const PURCHASE_ORDER_SUBMIT_URL = (id) => BaseUrl + `po/submit/${id}`;

export const CreateIGPUrl = BaseUrl + "po/gate-pass/create";
export const IGPLedgerUrl = (id) => BaseUrl + `po/${id}/gate-pass`;
export const CreatePOPaymentUrl = BaseUrl + "po/payment/create";
export const POPaymentLedgerUrl = (id) => BaseUrl + `po/${id}/payment`;
export const PurchasedOrdersUrl = BaseUrl + `po/all`;
export const PurchaseOrderInvoiceUpdateUrl = BaseUrl + "po/invoice";
export const ActivePurchaseOrders = BaseUrl + `po/all/active`;
export const ActivePurchaseOrdersItems = (poNumber) =>
  BaseUrl + `po/${poNumber}/items`;

export const WriteOffPurchaseOrders = BaseUrl + `po/with/writeoffs/all`;
export const WriteOffPurchaseOrdersItems = (poId) =>
  BaseUrl + `po/${poId}/items/with/writeoffs/all`;

export const PurchaseOrdersHistortyUrl = (poId) =>
  BaseUrl + `po/${poId}/history`;
export const PurchaseOrderByPaginationUrl = (
  limit,
  pageNo,
  poNumber,
  poStatus,
  poType,
  brandId,
  igpNumber
) =>
  BaseUrl +
  `po/all?number=${poNumber}&status=${poStatus}&typeId=${poType}&brandId=${brandId}&igpNumber=${igpNumber}&page=${pageNo}&limit=${limit}`;
export const PurchaseOrderIGPListUrl = (limit, pageNo) =>
  BaseUrl + `inward-gate-passes?page=${pageNo}&size=${limit}`;
export const POGatePassAddUrl = BaseUrl + "inward-gate-passes";
export const GatePassHistoryUrl = (id) =>
  BaseUrl + `inward-gate-passes/${id}/history`;
export const POGatePassByIdUrl = (id) => BaseUrl + `inward-gate-passes/${id}`;
export const ActivePeningPurchaseOrdersUrl = (number) =>
  BaseUrl + `po/active-pending?number=${number}`;

export const ItemStockUrl = BaseUrl + "item/add-stock";
export const SetStockUrl = BaseUrl + "set/add-stock";

// Bulk Payments
export const BulkPaymentsUrl = (
  limit,
  pageNo,
  batchId,
  sortOrder,
  status,
  type
) => {
  return (
    BaseUrl +
    `payments/batch?batchId=${batchId}&sortOrder=${sortOrder}&page=${pageNo}&size=${limit}&status=${status}&paymentType=${type}`
  );
};
export const BatchDataUrl = (id) => BaseUrl + `payments/batch/download/${id}`;
export const ApproveBatchUrl = (id) => BaseUrl + `payments/batch/approve/${id}`;
export const RejectBatchUrl = (id) => BaseUrl + `payments/batch/reject/${id}`;

//Send Notification
export const SendNotificationUrl = BaseUrl + "notifications";
export const SendNotificationSpecificUsersUrl = () =>
  BaseUrl + `notifications/users`;
export const GetNotificationStatusUrl = (code) =>
  BaseUrl + `notifications/${code}/status`;
export const GetAllSchedulePNUrl = BaseUrl + `notifications/scheduled/all`;
export const SchedulePNDeleteUrl = (id) =>
  BaseUrl + `notifications/scheduled/${id}`;
export const StockOutPNUrl = BaseUrl + "configuration/item-low-stock";

export const isTest = () =>
  BaseUrl.indexOf("https://test-api.zarya.app/") === 0;

// Comments
export const CommentsUrl = (type, id) => BaseUrl + `comment/${type}/${id}`;
export const CommentAddUrl = BaseUrl + `comment`;
export const POCommentsUrl = (id) => BaseUrl + `comment/purchaseOrder/${id}`;

// Merchants
export const PaymentProvidersUrl = BaseUrl + "user/payment-providers";

// Geo
export const CityListUrl = BaseUrl + "city";
export const AllCitiesUrl = BaseUrl + "city/all";
export const CityUrl = (id) => BaseUrl + `city/${id}`;
export const ProvincesUrl = BaseUrl + "city/province";

// Write Off
export const WriteOffAddUrl = BaseUrl + "write-off/reasons/add";
export const ReverseWriteOffUrl = BaseUrl + "write-off/reverse";
export const WriteOffUrl = (id) => BaseUrl + `write-off/reasons/${id}/update`;
export const WriteOffStatusUpdateUrl = (id, status) =>
  BaseUrl + `write-off/reasons/${id}/status?enabled=${status}`;

export const AllWriteOffUrl = BaseUrl + "write-off/reasons/all";
export const AllActiveWriteOffUrl = (status) =>
  BaseUrl + `write-off/reasons/all?enabled=${status}`;
export const WriteOffCreateUrl = BaseUrl + "write-off/create";
export const WriteOffByPaginationUrl = (limit, pageNo) =>
  BaseUrl + `write-off/all?page=${pageNo}&size=${limit}`;

export const AllConfigurationUrl = BaseUrl + "configuration/all";
export const AllConfigTypeUrl = (configName) =>
  BaseUrl + `configuration/${configName}`;
export const ConfigurationCreateUrl = BaseUrl + "configuration";
export const ConfigurationUpdateUrl = (id) =>
  BaseUrl + `configuration/update/${id}`;

//Image Upload
export const UploadImage = BaseUrl + "upload-image";

// Access Management
export const AllPermissionsUrl = BaseUrl + "authz/permission/all";
export const RolePermissionsUrl = (role) =>
  BaseUrl + `authz/${role}/permission`;
export const RolesUrl = BaseUrl + "authz/roles";

// Fraud Rules
export const getFraudRules = BaseUrl + `fraud/check/config?id=1`;
export const updateFraudRules = (id) =>
  BaseUrl + `fraud/check/config/${id}/update`;

// Payment Providers
export const paymentProvidersUrl = BaseUrl + "payment-providers";
export const updatePaymentProviderUrl = (id) =>
  BaseUrl + `payment-providers/${id}`;

export default {
  createEmployee: createEmployee,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee,
  getEmployeesList: getEmployeesList,
  getSpecificEmployee: getSpecificEmployee,
  loginUser: loginUser,
  createLocation: createLocation,
  updateLocation: updateLocation,
  deleteLocation: deleteLocation,
  getLocationList: getLocationList,
  getSpecificLocation: getSpecificLocation,
  createInventory: createInventory,
  updateInventory: updateInventory,
  deleteInventory: deleteInventory,
  getInventoryList: getInventoryList,
  getSpecificInventory: getSpecificInventory,
  createCart: createCart,
  updateCart: updateCart,
  deleteCart: deleteCart,
  getCartList: getCartList,
  getSpecificCart: getSpecificCart,
  createDepartment: createDepartment,
  updateDepartment: updateDepartment,
  deleteDepartment: deleteDepartment,
  getDepartmentList: getDepartmentList,
  getSpecificDepartment: getSpecificDepartment,
  createGiftCard: createGiftCard,
  updateGiftCard: updateGiftCard,
  deleteGiftCard: deleteGiftCard,
  getGiftCardList: getGiftCardList,
  getSpecificGiftCard: getSpecificGiftCard,
  createCustomer: createCustomer,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer,
  getCustomerList: getCustomerList,
  getSpecificCustomer: getSpecificCustomer,
  createGroup: createGroup,
  updateGroup: updateGroup,
  deleteGroup: deleteGroup,
  getGroupList: getGroupList,
  getSpecificGroup: getSpecificGroup,
  createTerminal: createTerminal,
  updateTerminal: updateTerminal,
  deleteTerminal: deleteTerminal,
  getTerminalList: getTerminalList,
  getSpecificTerminal: getSpecificTerminal,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUserList: getUserList,
  getSpecificUser: getSpecificUser,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  getCategoryList: getCategoryList,
  getSpecificCategory: getSpecificCategory,
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory,
  getSubCategoryList: getSubCategoryList,
  getSpecificSubCategory: getSpecificSubCategory,
  createPermission: createPermission,
  updatePermission: updatePermission,
  deletePermission: deletePermission,
  getPermissionList: getPermissionList,
  getSpecificPermission: getSpecificPermission,
  createRole: createRole,
  updateRole: updateRole,
  deleteRole: deleteRole,
  getRoleList: getRoleList,
  getSpecificRole: getSpecificRole,
  createPermissionByRole: createPermissionByRole,
  updatePermissionByRole: updatePermissionByRole,
  deletePermissionByRole: deletePermissionByRole,
  getPermissionByRoleList: getPermissionByRoleList,
  getSpecificPermissionByRole: getSpecificPermissionByRole,
  createSupplier: createSupplier,
  updateSupplier: updateSupplier,
  deleteSupplier: deleteSupplier,
  getSupplierList: getSupplierList,
  getSpecificSupplier: getSpecificSupplier,
};
