import { delay, axiosResponse } from "mock/mockHelpers";
import { createRecord } from "mock/mockDb";

export const addTransaction = async (req) => {
  await delay();
  const record = createRecord("sales", req);
  return axiosResponse({ transaction: record, success: true });
};

export const transationOfTeeSheet = addTransaction;
