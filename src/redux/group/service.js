import { axiosClient } from "../store";
import {
  createGroupUrl,
  updateGroupUrl,
  deleteGroupUrl,
  getGroupsListUrl,
  getSpecificGroupUrl,
} from "Constants";

export const getGroupsList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getGroupsListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGroups = (req) => {
  return axiosClient.post(createGroupUrl, req);
};

export const updateGroupDetails = (groupId, req) => {
  return axiosClient.patch(updateGroupUrl(groupId), req);
};

export const getSpecificGroup = async (groupId) => {
  return axiosClient.get(getSpecificGroupUrl(groupId));
};

export const deleteGroups = async (groupId) => {
  return axiosClient.delete(deleteGroupUrl(groupId));
};
