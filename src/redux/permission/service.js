import { axiosClient } from "../../redux/store";
import {
  createPermissionUrl,
  updatePermissionUrl,
  deletePermissionUrl,
  getPermissionListUrl,
  getSpecificPermissionUrl,
} from "Constants";

export const createPermissions = async (data) => {
  // console.log(data, "data");
  try {
    const response = await axiosClient.post(createPermissionUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePermissions = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updatePermissionUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePermissions = async (id) => {
  try {
    const response = await axiosClient.delete(`${deletePermissionUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPermissionsList = async (params) => {
  try {
    const response = await axiosClient.get(getPermissionListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificPermissions = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificPermissionUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
