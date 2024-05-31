import { axiosClient } from "../../redux/store";
import {
  createInventoryUrl,
  updateInventoryUrl,
  deleteInventoryUrl,
  getInventoryListUrl,
  getSpecificInventoryUrl,
} from "Constants";

export const createInventories = async (data) => {
  try {
    const response = await axiosClient.post(createInventoryUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateInventories = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateInventoryUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteInventories = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteInventoryUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInventoriesList = async (params) => {
  try {
    const response = await axiosClient.get(getInventoryListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificInventories = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificInventoryUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
