import { axiosResponse, axiosError, delay } from "./mockHelpers";
import {
  createRecord,
  deleteRecord,
  findById,
  paginateCollection,
  updateRecord,
} from "./mockDb";

export const createCrudService = ({
  collection,
  pluralKey,
  totalKey,
  listReturnsPlainData = true,
  createKey = "post",
  getSpecificKey = null,
}) => {
  const getList = async (limit, pageNo) => {
    await delay();
    const data = paginateCollection(
      collection,
      limit,
      pageNo,
      pluralKey,
      totalKey
    );
    return listReturnsPlainData ? data : { data };
  };

  const create = async (req) => {
    await delay();
    const record = createRecord(collection, req);
    if (createKey === "id") {
      return axiosResponse({ id: record.id, ...record });
    }
    return axiosResponse({ [createKey]: record });
  };

  const update = async (id, req) => {
    await delay();
    const record = updateRecord(collection, id, req);
    if (!record) {
      return axiosError("Record not found");
    }
    return axiosResponse(record);
  };

  const getSpecific = async (id) => {
    await delay();
    const record = findById(collection, id);
    if (!record) {
      return axiosError("Record not found");
    }
    if (getSpecificKey) {
      return axiosResponse({ [getSpecificKey]: record });
    }
    return axiosResponse(record);
  };

  const remove = async (id) => {
    await delay();
    deleteRecord(collection, id);
    return axiosResponse({ success: true });
  };

  return { getList, create, update, getSpecific, remove };
};
