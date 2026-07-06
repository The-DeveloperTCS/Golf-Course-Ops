import { createCrudService } from "mock/crudFactory";
import { delay, axiosResponse } from "mock/mockHelpers";
import {
  createRecord,
  deleteRecord,
  findById,
  paginateCollection,
  updateRecord,
} from "mock/mockDb";

const crud = createCrudService({
  collection: "categories",
  pluralKey: "categories",
  totalKey: "totalCategories",
  createKey: "post",
});

export const getCategoriesList = crud.getList;
export const createCategories = crud.create;
export const updateCategoryDetails = crud.update;
export const getSpecificCategory = crud.getSpecific;
export const deleteCategories = crud.remove;

export const getSubCategoriesList = async (limit, pageNo) => {
  await delay();
  return paginateCollection(
    "subCategories",
    limit,
    pageNo,
    "subCategories",
    "totalSubCategories"
  );
};

export const createSubCategories = async (req) => {
  await delay();
  const record = createRecord("subCategories", req);
  return axiosResponse({ id: record.id, ...record });
};

export const updateSubCategoryDetails = async (id, req) => {
  await delay();
  const record = updateRecord("subCategories", id, req);
  return axiosResponse(record);
};

export const getSpecificSubCategory = async (id) => {
  await delay();
  const record = findById("subCategories", id);
  return axiosResponse(record);
};

export const deleteSubCategories = async (id) => {
  await delay();
  deleteRecord("subCategories", id);
  return axiosResponse({ success: true });
};
