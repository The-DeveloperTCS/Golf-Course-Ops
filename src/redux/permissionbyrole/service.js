import axios from "axios";
import { BaseUrl } from "Constants";

export const createPermissionByRole = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/permissionbyrole/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePermissionByRole = async (id, data) => {
  try {
    const response = await axios.put(
      `${BaseUrl}/permissionbyrole/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePermissionByRole = async (id) => {
  try {
    const response = await axios.delete(
      `${BaseUrl}/permissionbyrole/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPermissionsByRoleList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/permissionbyrole/getAll`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificPermissionByRole = async (id) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/permissionbyrole/specificId/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
