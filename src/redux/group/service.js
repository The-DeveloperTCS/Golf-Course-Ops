import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "groups",
  pluralKey: "groups",
  totalKey: "totalGroups",
  createKey: "id",
});

export const getGroupsList = crud.getList;
export const createGroups = crud.create;
export const updateGroupDetails = crud.update;
export const getSpecificGroup = crud.getSpecific;
export const deleteGroups = crud.remove;
