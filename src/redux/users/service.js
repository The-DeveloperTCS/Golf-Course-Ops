import { delay, axiosResponse } from "mock/mockHelpers";
import { getPermissionsForRoleName } from "mock/permissions";

export const getPermissionsForRole = async (role) => {
  await delay();
  return axiosResponse(getPermissionsForRoleName(role));
};

export const updatePermission = async (permission) => {
  await delay();
  return axiosResponse(permission);
};
