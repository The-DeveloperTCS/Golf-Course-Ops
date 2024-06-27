import { axiosClient } from "../store";
import {
  createDepartmentUrl,
  updateDepartmentUrl,
  deleteDepartmentUrl,
  getDepartmentsListUrl,
  getSpecificDepartmentUrl,
} from "Constants";

export const getDepartmentsList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(
      getDepartmentsListUrl(limit, pageNo)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDepartments = (req) => {
  return axiosClient.post(createDepartmentUrl, req);
};

export const updateDepartmentDetails = (departmentId, req) => {
  return axiosClient.patch(updateDepartmentUrl(departmentId), req);
};

export const getSpecificDepartment = async (departmentId) => {
  return axiosClient.get(getSpecificDepartmentUrl(departmentId));
};

export const deleteDepartments = async (departmentId) => {
  return axiosClient.delete(deleteDepartmentUrl(departmentId));
};
