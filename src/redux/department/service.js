import axios from "axios";
import { BaseUrl } from "Constants";

export const createDepartment = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/department/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDepartment = async (id, data) => {
  try {
    const response = await axios.put(
      `${BaseUrl}/department/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/department/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentsList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/department/getAll`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificDepartment = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/department/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
