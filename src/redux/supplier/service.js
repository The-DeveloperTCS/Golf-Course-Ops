import axios from "axios";
import { BaseUrl } from "Constants";

export const createSupplier = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/supplier/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSupplier = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/supplier/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/supplier/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSuppliersList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/supplier/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificSupplier = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/supplier/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
