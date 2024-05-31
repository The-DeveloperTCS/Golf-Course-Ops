import { axiosClient } from "../../redux/store";
import {
  createUserUrl,
  updateUserUrl,
  deleteUserUrl,
  getUserListUrl,
  getSpecificCUserUrl,
} from "Constants";

export const createUsers = async (data) => {
  console.log(data, "data");
  try {
    const response = await axiosClient.post(createUserUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUsers = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateUserUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteUserUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersList = async (params) => {
  try {
    const response = await axiosClient.get(getUserListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificUsers = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificCUserUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
