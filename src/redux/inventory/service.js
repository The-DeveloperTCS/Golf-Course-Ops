import axios from "axios";
import { BaseUrl } from "Constants";

export const createInventory = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/inventory/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateInventory = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/inventory/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteInventory = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/inventory/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInventoriesList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/inventory/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificInventory = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/inventory/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
