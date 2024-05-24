import axios from "axios";
import { BaseUrl } from "Constants";

export const createSubcategory = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/sub-category/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubcategory = async (id, data) => {
  try {
    const response = await axios.put(
      `${BaseUrl}/sub-category/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubcategory = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/sub-category/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubcategoriesList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/sub-category/getAll`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificSubcategory = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/subcategory/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
