import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import { getCollection } from "mock/mockDb";

const crud = createCrudService({
  collection: "roles",
  pluralKey: "roles",
  totalKey: "totalRoles",
  listReturnsPlainData: false,
  createKey: "post",
});

export const getRolesList = crud.getList;

export const getActiveRolesList = async () => {
  await delay();
  return axiosResponse({ roles: getCollection("roles") });
};

export const createRoles = crud.create;
export const updateRoleDetails = crud.update;
export const getSpecificRole = crud.getSpecific;
export const deleteRoles = crud.remove;
