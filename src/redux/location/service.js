import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "locations",
  pluralKey: "locations",
  totalKey: "totalLocations",
  createKey: "post",
});

export const getLocationsList = crud.getList;
export const createLocations = crud.create;
export const createLocation = crud.create;
export const updateLocationDetails = crud.update;
export const getSpecificLocation = crud.getSpecific;
export const deleteLocations = crud.remove;
