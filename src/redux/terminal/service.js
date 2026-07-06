import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import { getCollection } from "mock/mockDb";

const crud = createCrudService({
  collection: "terminals",
  pluralKey: "terminals",
  totalKey: "totalTerminals",
  listReturnsPlainData: false,
  createKey: "post",
});

export const getTerminalsList = crud.getList;
export const getAllTerminalsList = async () => {
  await delay();
  return axiosResponse({ terminals: getCollection("terminals") });
};
export const createTerminals = crud.create;
export const updateTerminalDetails = crud.update;
export const getSpecificTerminal = crud.getSpecific;
export const deleteTerminals = crud.remove;
