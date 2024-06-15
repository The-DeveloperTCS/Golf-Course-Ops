import axios from "axios";

//export const BaseUrl = "https://api.traveling-partner.com/api/";

//export const BaseUrl = "https://http://localhost:3000/";

// export const SENTRY_DSN = process.env.SENTRY_DSN;

//export const LoginUrl = BaseUrl + "user/login";

//export const LoginUrl = "http://localhost:3000/user/login";
//export const PermissionsUrl = "http://localhost:3000/permission/byRole";

//export const LoginOTPUrl = BaseUrl + "loginVerify";

//export const PermissionsUrl = "http://localhost:3000/permission/byRole";

//export const PermissionsUrl = BaseUrl + "authz/permission";

export const BaseUrl = "http://localhost:3000/";

export const LoginUrl = BaseUrl + "user/login";
export const PermissionsUrl = BaseUrl + "permission/byRole";
export const LoginOTPUrl = BaseUrl + "loginVerify";

//Employee Endpoints
export const getEmployeesListUrl = (limit, pageNo) =>
  BaseUrl + `employee/getAll/?page=${pageNo}&limit=${limit}`;
export const createEmployeeUrl = BaseUrl + "employee/add";
export const updateEmployeeUrl = (id) => BaseUrl + `employee/update/${id}`;
export const getSpecificEmployeeUrl = (id) =>
  BaseUrl + `employee/specificId/${id}`;
export const deleteEmployeeUrl = (id) => BaseUrl + `employee/delete/${id}`;

//Role Endpoints

export const getRoleListUrl = (pageNo, limit) =>
  BaseUrl + `role/getAll?page=${pageNo}&limit=${limit}`;

export const createRoleUrl = BaseUrl + "/role/add";
export const updateRoleUrl = BaseUrl + "/role/update/";
export const deleteRoleUrl = BaseUrl + "/role/delete/";
export const getSpecificRoleUrl = BaseUrl + "/role/specificId/";

//Terminal Endpoints

export const getTerminalListUrl = (pageNo, limit) =>
  BaseUrl + `terminal/getAll?page=${pageNo}&limit=${limit}`;

export const createTerminalUrl = BaseUrl + "/terminal/add";
export const updateTerminalUrl = BaseUrl + "/terminal/update/";
export const deleteTerminalUrl = BaseUrl + "/terminal/delete/";
export const getSpecificCTerminalUrl = BaseUrl + "/terminal/specificId/";

//Location Endpoints

export const createLocationUrl = BaseUrl + "location/add";
export const updateLocationUrl = BaseUrl + "location/update/";
export const deleteLocationUrl = BaseUrl + "location/delete/";
export const getLocationListUrl = BaseUrl + "location/getAll";
export const getSpecificLocationUrl = BaseUrl + "location/specificId/";

//Inventory Endpoints

export const createInventoryUrl = BaseUrl + "/inventory/add";
export const updateInventoryUrl = BaseUrl + "/inventory/update/";
export const deleteInventoryUrl = BaseUrl + "/inventory/delete/";
export const getInventoryListUrl = BaseUrl + "/inventory/getAll";
export const getSpecificInventoryUrl = BaseUrl + "/inventory/specificId/";
//const loginUser = (data) => axios.post(LoginUrl, data);

//Cart Endpoints

export const createCartUrl = BaseUrl + "cart/add";
export const updateCartUrl = BaseUrl + "cart/update/";
export const deleteCartUrl = BaseUrl + "cart/delete/";
export const getCartListUrl = BaseUrl + "cart/getAll";
export const getSpecificCartUrl = BaseUrl + "cart/specificId/";
//const loginUser = (data) => axios.post(LoginUrl, data);

//Department Endpoints

export const createDepartmentUrl = BaseUrl + "department/add";
export const updateDepartmentUrl = BaseUrl + "department/update/";
export const deleteDepartmentUrl = BaseUrl + "department/delete/";
export const getDepartmentListUrl = BaseUrl + "department/getAll";
export const getSpecificDepartmentUrl = BaseUrl + "department/specificId/";
//const loginUser = (data) => axios.post(LoginUrl, data);

//GiftCard Endpoints

export const createGiftCardUrl = BaseUrl + "/giftcard/add";
export const updateGiftCardUrl = BaseUrl + "/giftcard/update/";
export const deleteGiftCardUrl = BaseUrl + "/giftcard/delete/";
export const getGiftCardListUrl = BaseUrl + "/giftcard/getAll/";
export const getSpecificGiftCardUrl = BaseUrl + "/giftcard/specificId/";

//Customer Endpoints

export const createCustomerUrl = BaseUrl + "/customer/add";
export const updateCustomerUrl = BaseUrl + "/customer/update/";
export const deleteCustomerUrl = BaseUrl + "/customer/delete/";
export const getCustomerListUrl = BaseUrl + "/customer/getAll/";
export const getSpecificCustomerUrl = BaseUrl + "/customer/specificId/";

//Group Endpoints

export const createGroupUrl = BaseUrl + "/group/add";
export const updateGroupUrl = BaseUrl + "/group/update/";
export const deleteGroupUrl = BaseUrl + "/group/delete/";
export const getGroupListUrl = BaseUrl + "/group/getAll/";
export const getSpecificCGroupUrl = BaseUrl + "/group/specificId/";

//User Endpoints

export const createUserUrl = BaseUrl + "/user/add";
export const updateUserUrl = BaseUrl + "/user/update/";
export const deleteUserUrl = BaseUrl + "/user/delete/";
export const getUserListUrl = BaseUrl + "/user/getAll/";
export const getSpecificCUserUrl = BaseUrl + "/user/specificId/";

//Category Endpoints

export const createCategoryUrl = BaseUrl + "/category/add";
export const updateCategoryUrl = BaseUrl + "/category/update/";
export const deleteCategoryUrl = BaseUrl + "/category/delete/";
export const getCategoryListUrl = BaseUrl + "/category/getAll/";
export const getSpecificCategoryUrl = BaseUrl + "/category/specificId/";

//SubCategory Endpoints

export const createSubCategoryUrl = BaseUrl + "/sub-category/add";
export const updateSubCategoryUrl = BaseUrl + "/sub-category/update/";
export const deleteSubCategoryUrl = BaseUrl + "/sub-category/delete/";
export const getSubCategoryListUrl = BaseUrl + "/sub-category/getAll/";
export const getSpecificSubCategoryUrl = BaseUrl + "/sub-category/specificId/";

//Permission Endpoints

export const createPermissionUrl = BaseUrl + "/permission/add";
export const updatePermissionUrl = BaseUrl + "/permission/update/";
export const deletePermissionUrl = BaseUrl + "/permission/delete/";
export const getPermissionListUrl = BaseUrl + "/permission/getAll/";
export const getSpecificPermissionUrl = BaseUrl + "/permission/specificId/";

//PermissionByRole Endpoints

export const createPermissionRoleUrl = BaseUrl + "/permission-by-role/add";
export const updatePermissionRoleUrl = BaseUrl + "/permission-by-role/update/";
export const deletePermissionRoleUrl = BaseUrl + "/permission-by-role/delete/";
export const getPermissionRoleListUrl = BaseUrl + "/permission-by-role/getAll/";
export const getSpecificPermissionRoleUrl =
  BaseUrl + "/permission-by-role/specificId/";

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
