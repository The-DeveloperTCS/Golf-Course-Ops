import { axiosClient } from "../../redux/store";
import {
  createLocationUrl,
  updateLocationUrl,
  deleteLocationUrl,
  getLocationListUrl,
  getSpecificLocationUrl,
} from "Constants";

export const createLocations = async (data) => {
  try {
    const response = await axiosClient.post(createLocationUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLocations = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateLocationUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLocations = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteLocationUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLocationsList = async (params) => {
  try {
    const response = await axiosClient.get(getLocationListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificLocations = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificLocationUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
