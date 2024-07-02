import { axiosClient } from "../../redux/store";
import {
  createRoleUrl,
  updateRoleUrl,
  deleteRoleUrl,
  getRoleListUrl,
  getSpecificRoleUrl,
} from "Constants";

export const getRolesList = (limit, pageNo) => {
  return axiosClient.get(getRoleListUrl(limit, pageNo));
};

export const createRoles = (req) => {
  return axiosClient.post(createRoleUrl, req);
};

export const updateRoleDetails = (roleId, req) => {
  return axiosClient.patch(updateRoleUrl(roleId), req);
};

export const getSpecificRole = async (roleId) => {
  return axiosClient.get(getSpecificRoleUrl(roleId));
};

export const deleteRoles = async (roleId) => {
  return axiosClient.delete(deleteRoleUrl(roleId));
};
