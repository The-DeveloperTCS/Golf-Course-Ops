import { axiosClient } from "../../redux/store";
import {
  createCategoryUrl,
  updateCategoryUrl,
  deleteCategoryUrl,
  getCategoryListUrl,
  getSpecificCategoryUrl,
} from "Constants";

export const createCategories = async (data) => {
  console.log(data, "data");
  try {
    const response = await axiosClient.post(createCategoryUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategories = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateCategoryUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategories = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteCategoryUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesList = async (params) => {
  try {
    const response = await axiosClient.get(getCategoryListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCategories = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificCategoryUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
