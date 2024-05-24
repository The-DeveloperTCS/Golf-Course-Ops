import axios from "axios";
import { BaseUrl } from "Constants";

export const createPermission = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/permission/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePermission = async (id, data) => {
  try {
    const response = await axios.put(
      `${BaseUrl}/permission/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePermission = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/permission/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPermissionsList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/permission/getAll`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificPermission = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/permission/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
