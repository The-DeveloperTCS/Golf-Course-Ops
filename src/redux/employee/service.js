import { axiosClient } from "../../redux/store";
import {
  createEmployeeUrl,
  updateEmployeeUrl,
  deleteEmployeeUrl,
  getEmployeesListUrl,
  getSpecificEmployeeUrl,
} from "Constants";

export const createEmployees = async (data) => {
  try {
    const response = await axiosClient.post(createEmployeeUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployees = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateEmployeeUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployees = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteEmployeeUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeesList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getEmployeesListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificEmployees = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificEmployeeUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
