import { axiosClient } from "../../redux/store";
import {
  getTeeSheetByDateUrl,
  addTeeSheetUrl,
  updateTeeSheetUrl,
  deleteTeeSheetUrl,
  getSpecificTeeSheetUrl,
} from "Constants";

export const getTeeSheetByDate = (date) => {
  return axiosClient.get(getTeeSheetByDateUrl(date));
};

export const addTeeSheet = (req) => {
  return axiosClient.post(addTeeSheetUrl, req);
};

export const updateTeeSheetDetails = (teeSheetId, req) => {
  return axiosClient.patch(updateTeeSheetUrl(teeSheetId), req);
};

export const getSpecificTeeSheet = async (teeSheetId) => {
  return axiosClient.get(getSpecificTeeSheetUrl(teeSheetId));
};

export const deleteTeeSheet = async (teeSheetId) => {
  return axiosClient.delete(deleteTeeSheetUrl(teeSheetId));
};
