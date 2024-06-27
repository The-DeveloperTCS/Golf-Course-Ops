import { axiosClient } from "../store";
import {
  createPermissionUrl,
  updatePermissionUrl,
  deletePermissionUrl,
  getPermissionsListUrl,
  getSpecificPermissionUrl,
  getRolePermissionUrl,
} from "Constants";

export const getPermissionsList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(
      getPermissionsListUrl(limit, pageNo)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPermissions = (req) => {
  return axiosClient.post(createPermissionUrl, req);
};

export const updatePermissionDetails = (permissionId, req) => {
  return axiosClient.patch(updatePermissionUrl(permissionId), req);
};

export const getSpecificPermission = async (permissionId) => {
  return axiosClient.get(getSpecificPermissionUrl(permissionId));
};

export const deletePermissions = async (permissionId) => {
  return axiosClient.delete(deletePermissionUrl(permissionId));
};

export const getPermissionsForRole = (role) => {
  return axiosClient.get(getRolePermissionUrl(role));
};
