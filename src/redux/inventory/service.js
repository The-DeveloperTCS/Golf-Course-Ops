import { axiosClient } from "../store";
import {
  createInventoryUrl,
  updateInventoryUrl,
  deleteInventoryUrl,
  getInventorysListUrl,
  getSpecificInventoryUrl,
  getTeeSheetInventorysListUrl,
} from "Constants";

export const getIntevoriesList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getInventorysListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createInventorys = (req) => {
  return axiosClient.post(createInventoryUrl, req);
};

export const updateInventoryDetails = (inventoryId, req) => {
  return axiosClient.patch(updateInventoryUrl(inventoryId), req);
};

export const getSpecificInventory = async (inventoryId) => {
  return axiosClient.get(getSpecificInventoryUrl(inventoryId));
};

export const deleteInventorys = async (inventoryId) => {
  return axiosClient.delete(deleteInventoryUrl(inventoryId));
};

export const getTeeSheetInventorysList = async (inventoryId) => {
  return axiosClient.get(getTeeSheetInventorysListUrl(inventoryId));
};
