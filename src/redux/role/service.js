import axios from "axios";
import { BaseUrl } from "Constants";

export const createRole = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/role/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/role/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/role/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRolesList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificRole = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
