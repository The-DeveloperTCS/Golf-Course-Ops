import { axiosClient } from "../../redux/store";
import {
  createEmployeeUrl,
  updateEmployeeUrl,
  deleteEmployeeUrl,
  getEmployeesListUrl,
  getSpecificEmployeeUrl,
} from "Constants";

export const getEmployeesList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getEmployeesListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEmployees = (req) => {
  return axiosClient.post(createEmployeeUrl, req);
};

export const updateEmployeeDetails = (employeeId, req) => {
  return axiosClient.patch(updateEmployeeUrl(employeeId), req);
};

export const getSpecificEmployee = async (employeeId) => {
  return axiosClient.get(getSpecificEmployeeUrl(employeeId));
};

export const deleteEmployees = async (employeeId) => {
  return axiosClient.delete(deleteEmployeeUrl(employeeId));
};
