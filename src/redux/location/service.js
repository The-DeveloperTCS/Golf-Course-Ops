import axios from "axios";
import { BaseUrl } from "Constants";

export const createLocation = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/location/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/location/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/location/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLocationList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/location/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificLocation = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/location/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
