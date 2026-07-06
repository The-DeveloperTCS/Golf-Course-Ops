import { delay, axiosResponse } from "mock/mockHelpers";
import {
  createRecord,
  deleteRecord,
  findById,
  getCollection,
  updateRecord,
} from "mock/mockDb";

export const getTeeSheetByDate = async (date) => {
  await delay();
  const teesheets = getCollection("teesheets").filter(
    (sheet) => !date || sheet.date === date
  );
  return axiosResponse({ teesheets });
};

export const addTeeSheet = async (req) => {
  await delay();
  const record = createRecord("teesheets", {
    ...req,
    date: req.date || new Date().toISOString().slice(0, 10),
    status: "booked",
  });
  return axiosResponse({ teesheet: record, updatedTeeSheet: record });
};

export const updateTeeSheetDetails = async (teeSheetId, req) => {
  await delay();
  const record = updateRecord("teesheets", teeSheetId, req);
  return axiosResponse({ updatedTeeSheet: record, teesheet: record });
};

export const getSpecificTeeSheet = async (teeSheetId) => {
  await delay();
  const record = findById("teesheets", teeSheetId);
  return axiosResponse(record);
};

export const deleteTeeSheet = async (teeSheetId) => {
  await delay();
  deleteRecord("teesheets", teeSheetId);
  return axiosResponse({ success: true });
};
