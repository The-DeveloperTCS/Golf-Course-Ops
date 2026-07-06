import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import { getCollection } from "mock/mockDb";

const crud = createCrudService({
  collection: "customers",
  pluralKey: "customers",
  totalKey: "totalCustomers",
  createKey: "customer",
});

export const getCustomersList = crud.getList;
export const createCustomers = crud.create;
export const updateCustomerDetails = crud.update;
export const getSpecificCustomer = crud.getSpecific;
export const deleteCustomers = crud.remove;

export const getCustomers = async () => {
  await delay();
  return axiosResponse({ customers: getCollection("customers") });
};
