import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import { getCollection } from "mock/mockDb";

const crud = createCrudService({
  collection: "seasons",
  pluralKey: "seasons",
  totalKey: "totalSeasons",
  listReturnsPlainData: false,
  createKey: "season",
});

export const getSeasonsList = crud.getList;

export const getDateRangeSeasonsList = async (date) => {
  await delay();
  const seasons = getCollection("seasons");
  return axiosResponse({ seasons });
};

export const createSeasons = crud.create;
export const updateSeasonDetails = crud.update;
export const getSpecificSeason = crud.getSpecific;
export const deleteSeasons = crud.remove;
