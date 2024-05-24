import axios from "axios";
import { BaseUrl } from "Constants";

export const createEmployee = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/employee/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/employee/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/employee/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeesList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/employee/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificEmployee = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/employee/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
