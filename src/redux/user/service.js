import axios from "axios";
import { BaseUrl } from "Constants";

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/user/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/user/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/user/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/user/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificUser = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/user/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
