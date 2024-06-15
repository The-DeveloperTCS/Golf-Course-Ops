import { axiosClient } from "../../redux/store";
import {
  createGroupUrl,
  updateGroupUrl,
  deleteGroupUrl,
  getGiftCardListUrl,
  getSpecificCGroupUrl,
} from "Constants";

export const createGroups = async (data) => {
  // console.log(data, "data");
  try {
    const response = await axiosClient.post(createGroupUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroups = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateGroupUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroups = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteGroupUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupsList = async (params) => {
  try {
    const response = await axiosClient.get(getGiftCardListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificGroups = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificCGroupUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
