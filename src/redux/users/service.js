import { axiosClient } from "redux/store";
import { RolePermissionsUrl, PermissionsUrl } from "Constants";

export const getPermissionsForRole = (role) => {
  return axiosClient.get(RolePermissionsUrl(role));
};

export const updatePermission = (permission) => {
  return axiosClient.post(PermissionsUrl, permission);
};
