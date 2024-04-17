import { axiosClient } from "redux/store";
import {
  MerchantsUrl,
  MerchantUpdateUrl,
  MerchantsByUserUrl,
  MerchantByIdUrl,
  ProfitProcessUrl,
  MerchantsByIds,
  PaymentProvidersUrl,
  PendingProfitProccesUrl,
  UserRolesUrl,
  AllPermissionsUrl,
  RolesUrl,
  RolePermissionsUrl,
  PermissionsUrl,
  MerchantByPhone,
  SaleAgentsByPhone,
  MerchantHistoryUrl,
  MerchantOrderHistory,
  MerchantProfitLedger,
  ProfitStockUrl,
  MerchantsActivityByIds,
  MerchantsForPreview,
  MerchantsRewardsByIds,
  getAllSystemReward,
  RewardAddMerchant,
} from "Constants";

export const merchantsList = () => {
  return axiosClient.get(MerchantsUrl);
};

export const merchantGetByPhone = (number) => {
  return axiosClient.get(MerchantByPhone(number));
};

export const allSalesAgents = () => {
  return axiosClient.get(SaleAgentsByPhone());
};

export const fetchMerchantHistory = (id) => {
  return axiosClient.get(MerchantHistoryUrl(id));
};

export const merchantUpdate = (id, payload) => {
  return axiosClient.put(MerchantUpdateUrl.replace("{id}", id), payload);
};

export const fetchMerchantsByUser = (userIds) => {
  return axiosClient.get(MerchantsByUserUrl(userIds));
};

export const merchantGet = (id) => {
  return axiosClient.get(MerchantByIdUrl(id));
};

export const merchantGetByIds = (ids) => {
  return axiosClient.get(MerchantsByIds(ids));
};

export const merchantsForPreview = (body) => {
  return axiosClient.post(MerchantsForPreview, body);
};

export const merchantGetByIdsForActivity = (ids) => {
  return axiosClient.get(MerchantsActivityByIds(ids));
};

export const merchantNameGet = (id) => {
  return axiosClient.get(MerchantsByUserUrl(id));
};

export const paymentProvidersGet = () => {
  return axiosClient.get(PaymentProvidersUrl);
};

export const getRolesForUser = (userId) => {
  return axiosClient.get(UserRolesUrl(userId));
};

export const fetchOrderHistory = (merchantId) => {
  return axiosClient.get(MerchantOrderHistory(merchantId));
};

export const fetchProfitLedger = (merchantId) => {
  return axiosClient.get(MerchantProfitLedger(merchantId));
};

export const addMerchantProfit = (data) => {
  return axiosClient.post(ProfitStockUrl, data);
};

export const profitProcessMerchant = (profit) => {
  return axiosClient.post(ProfitProcessUrl, profit);
};

export const pendingProfitList = () => {
  return axiosClient.get(PendingProfitProccesUrl);
};

export const updateRolesForUser = (userId, roles) => {
  return axiosClient.post(UserRolesUrl(userId), roles);
};

export const getAllPermissions = () => {
  return axiosClient.get(AllPermissionsUrl);
};

export const getAllRoles = () => {
  return axiosClient.get(RolesUrl);
};

export const getPermissionsForRole = (role) => {
  return axiosClient.get(RolePermissionsUrl(role));
};

export const updatePermission = (permission) => {
  return axiosClient.post(PermissionsUrl, permission);
};

export const getMerchantRewards = (merchantId) => {
  return axiosClient.get(MerchantsRewardsByIds(merchantId));
};

export const getSystemRewards = (role) => {
  return axiosClient.get(getAllSystemReward);
};

export const addMerchantReward = (reward) => {
  return axiosClient.post(RewardAddMerchant, reward);
};
