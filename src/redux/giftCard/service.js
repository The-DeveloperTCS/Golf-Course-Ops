import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "giftCards",
  pluralKey: "giftCards",
  totalKey: "totalGiftCards",
  createKey: "id",
});

export const getGiftCardsList = crud.getList;
export const createGiftCards = crud.create;
export const updateGiftCardDetails = crud.update;
export const getSpecificGiftCard = crud.getSpecific;
export const deleteGiftCards = crud.remove;
