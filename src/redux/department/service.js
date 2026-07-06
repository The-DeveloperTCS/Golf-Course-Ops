import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "departments",
  pluralKey: "departments",
  totalKey: "totalDepartments",
  createKey: "post",
});

export const getDepartmentsList = crud.getList;
export const createDepartments = crud.create;
export const updateDepartmentDetails = crud.update;
export const getSpecificDepartment = crud.getSpecific;
export const deleteDepartments = crud.remove;
