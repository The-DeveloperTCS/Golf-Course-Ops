import { axiosClient } from "../../redux/store";
import {
  createCustomerUrl,
  updateCustomerUrl,
  deleteCustomerUrl,
  getCustomerListUrl,
  getSpecificCustomerUrl,
} from "Constants";

export const createCustomers = async (data) => {
  // console.log(data, "data");
  try {
    const response = await axiosClient.post(createCustomerUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomers = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateCustomerUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomers = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteCustomerUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomersList = async (params) => {
  try {
    const response = await axiosClient.get(getCustomerListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCustomers = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificCustomerUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
