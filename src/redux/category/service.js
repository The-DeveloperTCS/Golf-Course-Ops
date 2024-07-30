import { axiosClient } from "../store";
import {
  createCategoryUrl,
  updateCategoryUrl,
  deleteCategoryUrl,
  getCategorysListUrl,
  getSpecificCategoryUrl,
  allCategoriesUrl,
  getparentSubCategoryUrl,
  getSubCategorysListUrl,
  createSubCategoryUrl,
  updateSubCategoryUrl,
  getSpecificSubCategoryUrl,
  deleteSubCategoryUrl,
} from "Constants";

export const getCategoriesList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getCategorysListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubCategoriesList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(
      getSubCategorysListUrl(limit, pageNo)
    );
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

export const getAllCategories = async () => {
  return axiosClient.get(allCategoriesUrl);
};

export const getParentSubCategories = async (parentId) => {
  return axiosClient.get(getparentSubCategoryUrl(parentId));
};

export const createSubCategories = (req) => {
  return axiosClient.post(createSubCategoryUrl, req);
};

export const updateSubCategoryDetails = (subCategoryId, req) => {
  return axiosClient.patch(updateSubCategoryUrl(subCategoryId), req);
};

export const getSpecificSubCategory = async (subCategoryId) => {
  return axiosClient.get(getSpecificSubCategoryUrl(subCategoryId));
};

export const deleteSubCategories = async (subCategoryId) => {
  return axiosClient.delete(deleteSubCategoryUrl(subCategoryId));
};
