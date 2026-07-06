import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import { getCollection } from "mock/mockDb";

const crud = createCrudService({
  collection: "inventories",
  pluralKey: "inventories",
  totalKey: "totalInventories",
  createKey: "inventory",
});

export const getIntevoriesList = crud.getList;
export const createInventorys = crud.create;
export const updateInventoryDetails = crud.update;
export const getSpecificInventory = crud.getSpecific;
export const deleteInventorys = crud.remove;

export const getTeeSheetInventorysList = async (itemType) => {
  await delay();
  const items = getCollection("inventories").filter(
    (item) => !itemType || item.itemType === itemType || itemType === ""
  );
  return axiosResponse({ inventories: items });
};
