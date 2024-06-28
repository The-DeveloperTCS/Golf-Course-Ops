import { axiosClient } from "../../redux/store";
import {
  createRoleUrl,
  updateRoleUrl,
  deleteRoleUrl,
  getRoleListUrl,
  getSpecificRoleUrl,
} from "Constants";

export const getRolesList = (pageNo, limit) => {
  return axiosClient.get(getRoleListUrl(pageNo, limit));
};

export const createRoles = (req) => {
  return axiosClient.post(createRoleUrl, req);
};

export const updateRoleDetails = (terminalId, req) => {
  return axiosClient.patch(updateRoleUrl(terminalId), req);
};

export const getSpecificRole = async (terminalId) => {
  return axiosClient.get(getSpecificRoleUrl(terminalId));
};

export const deleteRoles = async (terminalId) => {
  return axiosClient.delete(deleteRoleUrl(terminalId));
};
