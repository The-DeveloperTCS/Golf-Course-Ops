import axios from "axios";
import { BaseUrl } from "Constants";

export const createCustomer = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/customer/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/customer/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/customer/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomersList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/customer/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCustomer = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/customer/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
