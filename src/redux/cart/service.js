import { createCrudService } from "mock/crudFactory";

const crud = createCrudService({
  collection: "carts",
  pluralKey: "carts",
  totalKey: "totalCarts",
  createKey: "post",
});

export const getCartsList = crud.getList;
export const createCarts = crud.create;
export const updateCartDetails = crud.update;
export const getSpecificCart = crud.getSpecific;
export const deleteCarts = crud.remove;
