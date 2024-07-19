import { axiosClient } from "../../redux/store";
import { checkInnUrl, checkOutUrl, getCheckInUrl } from "Constants";

export const checkInnClock = (req) => {
  return axiosClient.post(checkInnUrl, req);
};

export const checkOutClock = (req) => {
  return axiosClient.post(checkOutUrl, req);
};

export const getLastCheckIn = (date, userId) => {
  return axiosClient.get(getCheckInUrl(date, userId));
};

// export const updateTeeSheetDetails = (teeSheetId, req) => {
//   return axiosClient.patch(updateTeeSheetUrl(teeSheetId), req);
// };

// export const getSpecificTeeSheet = async (teeSheetId) => {
//   return axiosClient.get(getSpecificTeeSheetUrl(teeSheetId));
// };

// export const deleteTeeSheet = async (teeSheetId) => {
//   return axiosClient.delete(deleteTeeSheetUrl(teeSheetId));
// };
