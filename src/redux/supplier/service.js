import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "suppliers",
  pluralKey: "suppliers",
  totalKey: "totalSuppliers",
  createKey: "post",
});

export const getSuppliersList = crud.getList;
export const createSuppliers = crud.create;
export const updateSupplierDetails = crud.update;
export const getSpecificSupplier = crud.getSpecific;
export const deleteSuppliers = crud.remove;
