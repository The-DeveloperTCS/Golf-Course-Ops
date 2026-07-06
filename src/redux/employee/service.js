import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "employees",
  pluralKey: "employees",
  totalKey: "totalEmployees",
  createKey: "employee",
});

export const getEmployeesList = crud.getList;
export const createEmployees = crud.create;
export const updateEmployeeDetails = crud.update;
export const getSpecificEmployee = crud.getSpecific;
export const deleteEmployees = crud.remove;
