import { axiosClient } from "../store";
import {
  createCategoryUrl,
  updateCategoryUrl,
  deleteCategoryUrl,
  getCategorysListUrl,
  getSpecificCategoryUrl,
} from "Constants";

export const getCategoriesList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getCategorysListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategories = (req) => {
  return axiosClient.post(createCategoryUrl, req);
};

export const updateCategoryDetails = (categoryId, req) => {
  return axiosClient.patch(updateCategoryUrl(categoryId), req);
};

export const getSpecificCategory = async (categoryId) => {
  return axiosClient.get(getSpecificCategoryUrl(categoryId));
};

export const deleteCategories = async (categoryId) => {
  return axiosClient.delete(deleteCategoryUrl(categoryId));
};
