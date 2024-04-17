import { axiosClient } from "redux/store";
import {
  SendNotificationUrl,
  SendNotificationSpecificUsersUrl,
  GetNotificationStatusUrl,
  GetAllSchedulePNUrl,
  SchedulePNDeleteUrl,
  StockOutPNUrl,
} from "Constants";

export const SendNotification = (data) => {
  return axiosClient.post(SendNotificationUrl, data);
};

export const SendNotificationToSpecificUsers = (data) => {
  return axiosClient.post(SendNotificationSpecificUsersUrl(), data);
};

export const GetNotificationStatus = (code) => {
  return axiosClient.get(GetNotificationStatusUrl(code));
};

export const GetAllSchedulePN = () => {
  return axiosClient.get(GetAllSchedulePNUrl);
};

export const SchedulePNDelete = (id) => {
  return axiosClient.delete(SchedulePNDeleteUrl(id));
};

export const getStockOutPNDetails = () => {
  return axiosClient.get(StockOutPNUrl);
};

export const postStockOutPN = (data) => {
  return axiosClient.post(StockOutPNUrl, data);
};
