import { axiosClient } from "../store";
import {
  createLocationUrl,
  updateLocationUrl,
  deleteLocationUrl,
  getLocationsListUrl,
  getSpecificLocationUrl,
} from "Constants";

export const getLocationsList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getLocationsListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLocation = (req) => {
  return axiosClient.post(createLocationUrl, req);
};

export const updateLocationDetails = (employeeId, req) => {
  return axiosClient.patch(updateLocationUrl(employeeId), req);
};

export const getSpecificLocation = async (employeeId) => {
  return axiosClient.get(getSpecificLocationUrl(employeeId));
};

export const deleteLocations = async (employeeId) => {
  return axiosClient.delete(deleteLocationUrl(employeeId));
};
