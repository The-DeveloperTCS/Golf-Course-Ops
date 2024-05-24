import axios from "axios";
import { BaseUrl } from "Constants";

export const createCategory = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/category/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/category/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/category/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/category/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCategory = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/category/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
