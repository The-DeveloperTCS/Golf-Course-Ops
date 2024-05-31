import { axiosClient } from "../../redux/store";
import {
  createDepartmentUrl,
  updateDepartmentUrl,
  deleteDepartmentUrl,
  getDepartmentListUrl,
  getSpecificDepartmentUrl,
} from "Constants";

export const createDepartments = async (data) => {
  console.log(data, "data");
  try {
    const response = await axiosClient.post(createDepartmentUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDepartments = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateDepartmentUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDepartments = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteDepartmentUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentsList = async (params) => {
  try {
    const response = await axiosClient.get(getDepartmentListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificDepartments = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificDepartmentUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
