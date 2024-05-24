import axios from "axios";
import { BaseUrl } from "Constants";

export const createGroup = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/group/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroup = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/group/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroup = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/group/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupsList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/group/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificGroup = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/group/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
