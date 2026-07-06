import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import { getPermissionsForRoleName } from "mock/permissions";

const crud = createCrudService({
  collection: "permissions",
  pluralKey: "permissions",
  totalKey: "totalPermissions",
  createKey: "post",
});

export const getPermissionsList = crud.getList;
export const createPermissions = crud.create;
export const updatePermissionDetails = crud.update;
export const getSpecificPermission = crud.getSpecific;
export const deletePermissions = crud.remove;

export const getPermissionsForRole = async (role) => {
  await delay();
  return axiosResponse(getPermissionsForRoleName(role));
};

export const updatePermissionsOfRoles = async (permission) => {
  await delay();
  return axiosResponse(permission);
};

export const setPermissionByRoleFunc = async (req) => {
  await delay();
  return axiosResponse({ success: true, ...req });
};
