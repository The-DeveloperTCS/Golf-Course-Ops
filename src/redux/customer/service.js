import { axiosClient } from "../store";
import {
  createCustomerUrl,
  updateCustomerUrl,
  deleteCustomerUrl,
  getCustomersListUrl,
  getSpecificCustomerUrl,
} from "Constants";

export const getCustomersList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getCustomersListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCustomers = (req) => {
  return axiosClient.post(createCustomerUrl, req);
};

export const updateCustomerDetails = (customerId, req) => {
  return axiosClient.patch(updateCustomerUrl(customerId), req);
};

export const getSpecificCustomer = async (customerId) => {
  return axiosClient.get(getSpecificCustomerUrl(customerId));
};

export const deleteCustomers = async (customerId) => {
  return axiosClient.delete(deleteCustomerUrl(customerId));
};
